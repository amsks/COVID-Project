import "./App.css";
import {app} from "./base" 
import { useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import HomePage from "./pages/Home";
import Country from "./pages/Country";
import Layout from "./components/Layout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Footer from "./components/Footer"


// Firebase location imports
const storage = app.storage();


function App() {
  
  const [png, setpng] = useState("");
  const [title, setTitle] = useState("initialState");
  var pathReference = storage.ref("");
  
  // Get the Icon from the Firebase for the setpng
  pathReference
    .child("coronavirus.png")
    .getDownloadURL()
    .then(function (url) {
      setpng(url);
    })
    .catch(function (error) {
      console.log(error)
    });
  pathReference
    .child("coronavirus.png")
    .getDownloadURL()
    .then(function (url) {
      setTitle(url);
    })
    .catch(function (error) {
      console.log(error)
    });

  return (
    <div className="App">
      {/* <img src={png} style={{ width: "50px", height: "50px", margin: "10px" }}/> */}
      <BrowserRouter>
        <Layout>
          <Switch>
            <Route exact path="/" render={(props) => <HomePage {...props} />} />
            <Route exact path="/country" render={(props) => <Country {...props} />} />
            <Route path="/about" exact component={() => <About />} />{" "}
            <Route path="/contact" exact component={() => <Contact />} />{" "}
          </Switch>
        </Layout>
        
      </BrowserRouter>  
      <Footer />
    </div> 
    
  );
}

export default App;
