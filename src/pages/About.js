import React from "react";
import Footer from "../components/Footer"

function About() {
    return (
        <div className="about">
            <div className="container">
                <div className="row align-items-center my-5">
                        <h1 className="font-weight-light" class = "text-justify">About</h1>
                        <p align="left" class = "text-justify">
                            COVT is a a web application to visualize the data related to the progress of the COVID-19 
                            pandemic caused by the Novel SARS-COV-2 virus. The landing page shows the data across the 
                            world, fetched from https://covid19api.com, and visualizes this data through of pie charts,
                            bar graphs, and Line Graphs. There is also a global table displaying the numbers for each
                            country below that. When you click on any country name, it links you to the page of that 
                            country and shows the data in the same form for that particular country. You can also add n
                            news to about countries by logging into the website through your google account and then 
                            adding descriptions.   

                        </p>
                        <p align="left" class = "text-justify">
                            This application has been build using React JS with Bootstrap and Material-UI for styling. 
                            The backend is built on Firebase, which is also used for hosting this applciation. Finally,
                            ESLint has been used for validation
                        </p>
                    </div>
                    
                </div>
            </div>
    );
}

export default About;