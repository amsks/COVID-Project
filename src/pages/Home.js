// NPM Imports 
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

// Import the tables
import SummaryTable from "../tables/SummaryTable";
import CountryTable from "../tables/CountryTable";

//Import the graphs 
import PieGraph from "../graphs/PieGraph";
import BarGraph from "../graphs/BarGraph";
import LineGraph from "../graphs/LineGraph";

//Import the Login Bar
import LoginNews from "../components/LoginNews";


//firebase Imports  
import {db, storage} from "../base"


function HomePage({ history }) {

  const [image, setImage] = useState("");
    
  storage.ref("").child("coronavirus.png").getDownloadURL().then(function (url) {
          setImage(url);
      })
      .catch(function (error) {
          console.log("Image Could not Be Loaded")
      });

  const [summary, setSummary] = useState({});
  const [week, setWeek] = useState({});
  const [month, setMonth] = useState({});
  const [countryNews, setCountryNews] = useState([]);
  
  // Global News as a firebase collection 
  var latestNewsRef = db.collection("news").doc("global");

  // Updating the news collection
  const updateDB = (data, date, doc) => {
    db.collection("news").doc(doc).set({
        content: data,
        date: date,
      }).then(() => {
        console.log("DB updated");
      })
      .catch((error) => {
        console.log("error in updating DB");
      });
  };  

  // Run UseEffect once to get the data through the api call
  useEffect( () => {

    const fetchData = async () => {
      const summaryUrl = "https://api.covid19api.com/summary" ;
      const weekUrl = "https://corona.lmao.ninja/v2/historical/all?lastdays=8" ; 
      const monthUrl = "https://corona.lmao.ninja/v2/historical/all" ; 

      try {
        latestNewsRef.get().then(async (doc) => {
          const today = parseInt(new Date().getTime() / 86400000);
          if (doc.exists) {
            const date = doc.data().date;
            if (today > date) {
              const fullSummary = await axios.get(summaryUrl);
              setSummary(fullSummary.data);
              updateDB(fullSummary.data, today, "global");
            } else {
              console.log("cached from DB");
              setSummary(doc.data().content);
            }
          } 
          else {
            const fullSummary = await axios.get(summaryUrl);
            setSummary(fullSummary.data);
            updateDB(fullSummary.data, today, "global");
          }
        });

        const woche = await axios.get(weekUrl);
        setWeek(woche.data);
        const monat = await axios.get(monthUrl);
        setMonth(monat.data);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

    
  }, []);

  // Handling user news
  useEffect(() => {
    db.collection("userNews")
      .where("country", "==", "worldwide")
      .get()
      .then(function (querySnapshot) {
        let newNews = [];
        querySnapshot.forEach(function (doc) {
          newNews.push(doc.data());
        });
        setCountryNews(newNews);
      })
      .catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, []);

  
  return (
    <div className="home">
      <img
        src={image}
        style={{ width: "8%" }}
      />
      <h1>Worldwide Data</h1>
      <Fragment>
        <LoginNews />
        <h4>News Feed</h4>
        <div className="News"
          
        >     
          {countryNews.length > 0 ? (
            countryNews.map((el, index) => (
              <div className="card" align="left" style = {{ margin:"1%"}} key={index} >
                <div className="card-header">
                  {el.user}
                </div>
                <div className="card-body">
                  {el.description}
                </div>  
                  
                <div className="card-footer">
                  {el.date}
                </div>  
                {/* </div> */}
              </div>
            ))
          ) : (
            <div class="card text-center" style={{ margin: "1% ", maxWidth:'200px' }}>
              <div class="card-body">
                  No News Yet!
              </div>  
            </div>
          )}
        </div>
          {Object.keys(summary).includes("Global") && (
            <Fragment>
              <SummaryTable data={summary["Global"]} />
              <PieGraph data={summary["Global"]} />
            </Fragment>
          )}
          {week && (
            <Fragment>
              <BarGraph data={week} />
              <LineGraph data={month} />
            </Fragment>
          )}
          {Object.keys(summary).includes("Global") && (
            // <Fragment>
              <CountryTable data={summary["Countries"]} />
            // </Fragment>
          )}
        {/* </div> */}
      </Fragment>
      <br/>
      <br/>
      {/* </div> */}
    </div>
    // </div>
  );
}

HomePage.propTypes = {};

export default withRouter(HomePage);
