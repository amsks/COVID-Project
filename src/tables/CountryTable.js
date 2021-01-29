import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// const useStyles = 

export default function CountryTable({ data }) {
  
  // Define the Style of the Table
  const classes = makeStyles({
    table: {
      width: 850,
      margin: "auto",
    },
    row: {
      "&:hover": {
        cursor: "pointer",
      },
    },
  });
  

  // Get the History from the router DoM
  const history = useHistory();

  // Processed Data
  const [processed, setProcessed] = useState(null);

  useEffect(() => {
    setProcessed(data);
  }, [data]);

  const handleSort = async (type, order) => {
    const key = type.replace(/\s+/g, "");
    const newData = await processed.sort((a, b) => {
      if (a[key] > b[key]) {
        if (order === "ascending") {
          return 1;
        } else {
          return -1;
        }
      } else {
        if (order === "ascending") {
          return -1;
        } else {
          return 1;
        }
      }
    });
    setProcessed(null);
    setProcessed(newData);
  };

  return (
    <>
    
    <br/><br/><br/>
    <h4>Country-based Summary</h4>
    
    <Paper elevation={2}  style={{ margin:'auto',marginTop: "2%" , width:'90%'}} >
      
      {processed && (
        <TableContainer
          component={Paper}
          style={{ maxHeight: -1, }}
        >
          <Table
            className={classes.table}
            aria-label="simple table"
            size="small"
          >
            <TableHead>
              <TableRow hover>
                <TableCell align="left">
                  Country
                </TableCell>
                {[
                  "New Confirmed",
                  "Total Confirmed",
                  "New Recovered",
                  "Total Recovered",
                  "New Deaths",
                  "Total Deaths",
                ].map((el, index) => (
                  <TableCell align="left" key={index}>
                    {el}
                    <br />
                    <KeyboardArrowDownIcon
                      onClick={() => handleSort(el, "descending")}
                    />
                    <KeyboardArrowUpIcon
                      onClick={() => handleSort(el, "ascending")}
                    />
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {processed.map((row) => (
                <TableRow key={row["Country"]} hover className={classes.row}>
                  <TableCell component="th" scope="row" onClick={() => history.push({
                              pathname: `/country`,
                              state: `${row.Country}`,
                              slug: `${row.Slug}`,
                              summary: row
                            })}
                  >
                    {row.Country}
                  </TableCell>
                  <TableCell align="left">{row.NewConfirmed}</TableCell>
                  <TableCell align="left">{row.TotalConfirmed}</TableCell>
                  <TableCell align="left">{row.NewRecovered}</TableCell>
                  <TableCell align="left">{row.TotalRecovered}</TableCell>
                  <TableCell align="left">{row.NewDeaths}</TableCell>
                  <TableCell align="left">{row.TotalDeaths}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Paper>
  </>                        
  );
}
