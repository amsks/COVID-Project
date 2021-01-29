import { Dialog, DialogContent, DialogTitle, MenuItem, Select, TextField, Button} from "@material-ui/core";


import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
// import Button from "./Button"

// Firebase Imports
import {
  auth, 
  googleProvider, 
  db
} from "../base"

export default function LoginNews() {
  
  // State hooks
  const [user, setUser] = useState(null);
  const [newsAdd, setNewsAdd] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [description, setDescription] = useState(null);
  // const [date, setDate] = useState(null);

  // Google Sign-in Functionality 
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(googleProvider).then((item) => {
        var userRef = db.collection("eligibleUsers").doc(item.user.email);
        userRef.get().then(async (doc) => {
          if (doc.exists) {
            setUser(item.user);
          } else {
            alert("You are not an eligible user yet. Please visit the Contact page to get in touch!");
            setUser(null);
            auth.signOut();
          }
        });
        console.log(item.user);
      }).catch((error) => {
        console.log(error.message);
      });
  };

  // If the authentication has passed, then keep teh user logged-in for multiple pages
  useEffect(() => {
    setUser(auth.currentUser);
  }, [auth.currentUser]);

  // Get the country Data for selecting the country
  useEffect( () => {

    const fetchData = async () => {
      
      const countryUrl = "https://api.covid19api.com/countries";

      try {
        const countryData = await axios.get(countryUrl);
        const countries = countryData.data.map((el) => el["Country"]).sort();
        setCountryList(countries);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();    
  }, []);
  
  // Handler for Adding News
  const addNews = () => {

    db.collection("userNews").doc().set({
        description: description,
        date: new Date().toDateString(),
        user: auth.currentUser.displayName,
        country: selectedCountry,
      }).then(() => {
        console.log("News Added");
      }).catch((error) => {
        console.log("error in adding news to Firestore");
      });
    
    setNewsAdd(false);
  };


  return (
    <Fragment>
        <div className="navbar navbar-expand-lg" align="left" style={{
            maxWidth: "100%",
            margin:'1% 5%'
        }}>
          <div style={{ flexGrow: 1 }} >
            <h5> {user ? ("Welcome" + user.displayName) : "Welcome"}</h5>
          </div>
          {!user && (
            <Button onClick={signInWithGoogle} align="right">
              Login
            </Button>
          )}
          {user && (
            <Fragment>
              <Button onClick={() => setNewsAdd(true)}>
                Add News
              </Button>
              <Dialog open={newsAdd} onClose={() => setNewsAdd(false)}>
                <DialogTitle>Let's add some News</DialogTitle>
                <DialogContent>
                  Specify the news characteristics
                  <br />
                  <Select
                    placeholder={"Select which country"}
                    id="demo-simple-select"
                    value={selectedCountry}
                    fullWidth
                    style={{ marginTop: "5%" }}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <MenuItem value={"worldwide"}>WorldWide</MenuItem>
                    {countryList.map((country) => (
                      <MenuItem value={country}>{country}</MenuItem>
                    ))}
                  </Select>
                  <br />
                  <TextField
                    placeholder="News Description..."
                    rows={5}
                    multiline
                    fullWidth
                    value={description}
                    style={{ marginTop: "5%" }}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                  <Button variant="contained" onClick={addNews} fullWidth>
                    SUBMIT
                  </Button>
                </DialogContent>
              </Dialog>
            </Fragment>
          )}
          {user && (
            <Button
              color="inherit"
              onClick={() => {
                auth.signOut().then(() => console.log("signed out"));
                setUser(null);
              }}
            >
              Signout
            </Button>
          )}
        </div>
    </Fragment>
  );
}
