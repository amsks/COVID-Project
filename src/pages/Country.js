// NPM Component Imports
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { useHistory } from "react-router-dom";

// Custom component Imports
import SummaryTable from "../tables/SummaryTable";
import PieGraph from "../graphs/PieGraph";
import BarGraph from "../graphs/BarGraph";
import LineGraph from "../graphs/LineGraph";
import LoginNews from "../components/LoginNews";

//firebase Imports
import {db} from "../base"

function Country({ location }) {

  const [summary, setSummary] = useState({});
  const [month, setMonth] = useState({});
  const [countryNews, setCountryNews] = useState([]);

  const history = useHistory();

  // Update Database
  const updateDB = (data, date, doc) => {
    db.collection("news").doc(doc).set({
        content: data,
        date: date,
    }).then(() => {
        console.log("DB updated");
    }).catch((error) => {
        console.log("error in updating DB");
    });
  };

  // Handling User News 
  useEffect(() => {
    db.collection("userNews")
      .where("country", "==", location.state).get().then(function (querySnapshot) {
        let newNews = [];
        querySnapshot.forEach(function (doc) {
          // doc.data() is never undefined for query doc snapshots
          newNews.push(doc.data());
        });
        setCountryNews(newNews);
      }).catch(function (error) {
        console.log("Error getting documents: ", error);
      });
  }, [location.state]);

  // Fetching the Country Data 
  useEffect( () => {
    
    const fetchData = async () =>  {
      try {
        
        const monthUrl = `https://corona.lmao.ninja/v3/covid-19/historical/${location.slug}`;
        
        db.collection("news").doc(location.state).get().then(async (doc) => {
          const today = parseInt(new Date().getTime() / 86400000);
          if (doc.exists) {
            const date = doc.data().date;
            if (today > date) {
              const monat = await axios.get(monthUrl);
              setMonth(monat.data.timeline);
              updateDB(monat.data.timeline, today, location.state);
            } else {
              console.log("cached from DB");
              setMonth(doc.data().content);
            }
          } else {
            const monat = await axios.get(monthUrl);
            setMonth(monat.data.timeline);
            updateDB(monat.data.timeline, today, location.state);
          }
        });

        setSummary(location.summary);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData(); 

  }, []);

  if (!location.state){
    history.push("/");
  } 
  else {
    return (
      <div className="Country">
        <h1>{location.state}</h1>
        <Fragment>
          <LoginNews />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "250px",
              maxWidth: "100%",
              overflow: "scroll",
              margin:'1% 5%'
            }}
          >     
            {countryNews.length > 0 ? (
              countryNews.map((el) => (
                <div class="card align-items-left" style={{ margin: "1% " ,maxWidth:'250px'}}>
                  <div class="card-header">
                    {el.user}
                  </div>
                  <div class="card-body">
                    {el.description}
                  </div>  
                    
                  <div class="card-footer">
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
            {summary && Object.keys(summary).includes("Country") && (
              <Fragment>
                <SummaryTable data={summary} />
                <PieGraph data={summary} />
              </Fragment>
            )}
            {month && Object.keys(month).includes("cases") && (
              <Fragment>
                <BarGraph data={month} />
                <LineGraph data={month} />
              </Fragment>
            )}
          {/* </div> */}
        </Fragment>
      </div>
    );
  }
    
}

Country.propTypes = {};

export default withRouter(Country);
