//@ts-nocheck
import React, { useEffect } from "react";
import { Select, MenuItem } from "@mui/material";
// import * as d3 from "d3";
import "./a.css";
import CalendarHeatmap from "react-calendar-heatmap";
import ReactTooltip from "react-tooltip";
import { useState } from "react";
const HeatMap = ({ children = [] }) => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);
  const curr = new Date().getFullYear();
  const doThis = () => {
    let first = new Date().getFullYear();
    children.forEach((value) => {
      const year = value.date.getFullYear();
      if (first) {
        if (year < first) {
          first = year;
        }
      }
    });
    let temp = [];
    for (let i = curr; i >= first; i--) {
      temp.push(i);
    }
    console.log(temp);
    setYears(temp);
    // console.log(first);
    // setStart(first);
  };
  const handleChange = (e) => {
    setYear(e.target.value);
  };
  useEffect(() => {
    doThis();
  }, []);
  return (
    <>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={year}
        label="Age"
        onChange={handleChange}
      >
        {years.map((value) => {
          return <MenuItem value={value}>{value}</MenuItem>;
        })}
        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
      <CalendarHeatmap
        startDate={new Date(`${year}-01-01`)}
        endDate={new Date(`${year}-12-31`)}
        values={children}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          if (value.date === null) {
            return;
          }
          return {
            "data-tip": `${value.date.toISOString().slice(0, 10)} has ${
              value.nos
            } submission(s)`,
          };
        }}
        showWeekdayLabels={true}
        onClick={(value) => alert(`Clicked on value with count: ${value.nos}`)}
      />
      <ReactTooltip />
    </>
  );
};

export default HeatMap;
