import { Paper } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function BarGraph({ data }) {
  const [processedData, setProcessedData] = useState(null);
  
  useEffect(() => {
    if (Object.keys(data).length > 0) {

      const keys = Object.keys(data["cases"])
        .slice(Math.max(Object.keys(data["cases"]).length - 7, 1))
        .sort((x, y) => {
          const date_x = x.split("/");
          const date_y = y.split("/");
          if (date_x[2] > date_y[2]) {
            return 1;
          } else if (date_x[2] < date_y[2]) {
            return -1;
          } else {
            if (date_x[1] > date_y[1]) {
              return 1;
            } else if (date_x[1] < date_y[1]) {
              return -1;
            } else {

              if (date_x[0] > date_y[0]) {
                return 1;
              } else if (date_x[0] < date_y[0]) {
                return -1;
              } else {
                return 1;
              }
            }
          }
        });

      const cases = Object.values(data["cases"])
        .slice(Math.max(Object.values(data["cases"]).length - 7, 1))
        .sort();

      const deaths = Object.values(data["deaths"])
        .slice(Math.max(Object.values(data["deaths"]).length - 7, 1))
        .sort();

      const recovered = Object.values(data["recovered"])
        .slice(Math.max(Object.values(data["recovered"]).length - 7, 1))
        .sort();

      let newData = [];
      let obj = {};

      for (let i = 0; i < keys.length; i++) {
        if (i === 0) {
          obj = {
            "New Confirmed": cases[i],
            "New Deaths": deaths[i],
            "New Recovered": recovered[i],
          };
        } else {
          obj = {
            name: keys[i],
            "New Confirmed": cases[i] - cases[i - 1],
            "New Deaths": deaths[i] - deaths[i - 1],
            "New Recovered": recovered[i] - recovered[i - 1],
          };
          newData.push(obj);
        }
      }
      setProcessedData(newData);
    }
  }, [data]);

  // console.log(processedData);
  return (
    <Paper
      elevation={2}
      style={{
        margin: "auto",
        marginTop: "2%",
        width: "90%",
        paddingTop: "2%",
        paddingBottom: "2%",
      }}
    >
      <BarChart
        style={{ margin: "auto" }}
        width={700}
        height={400}
        data={processedData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="New Confirmed" fill="#4099ff" />
        <Bar dataKey="New Deaths" fill="#fc032d" />
        <Bar dataKey="New Recovered" fill="#00C49F" />
      </BarChart>
    </Paper>
  );
}
