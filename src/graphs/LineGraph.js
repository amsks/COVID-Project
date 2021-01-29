import { Paper } from "@material-ui/core";
// import {Paper} from "paper"
import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";


export default function LineGraph({ data }) {
  const [processedData, setProcessedData] = useState(null);
  
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      
      const keys = Object.keys(data["cases"]);
      const cases = Object.values(data["cases"]).sort();
      const deaths = Object.values(data["deaths"]).sort();
      const recovered = Object.values(data["recovered"]).sort();
      
      let excerpt = [];
      let excerpt_obj = {};
      
      for (let i = 0; i < keys.length; i++) {
        if (i === 0) {
          excerpt_obj = {
            "Total Confirmed": cases[i],
            "Total Deaths": deaths[i],
            "Total Recovered": recovered[i],
          };
        } else {
          excerpt_obj = {
            name: keys[i],
            "Total Confirmed": cases[i],
            "Total Deaths": deaths[i],
            "Total Recovered": recovered[i],
          };
          excerpt.push(excerpt_obj);
        }
      }
      // const newData = data.map(mapper);
      if (excerpt.length == 0) return null ; 
      setProcessedData(excerpt);
    }
  }, [data]);
  return (
  <>
    <br/><br/><br/>
    <h4>Total Cases Time Series</h4>
    <Paper elevation={2} style={{ margin: "auto", marginTop: "2%", width: "90%" }}>
      
      <LineChart
        style={{ margin: "auto" }}
        width={700}
        height={700}
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line dataKey="Total Confirmed" stroke="#4099ff" activeDot={{ r: 8 }} />
        <Line dataKey="Total Deaths" stroke="#fc032d" />
        <Line dataKey="Total Recovered" stroke="#00C49F" />
      </LineChart>
    </Paper>
  </>
  );
}
