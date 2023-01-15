import React from "react";
// import * as d3 from "d3";
import "./a.css";
import CalendarHeatmap from "react-calendar-heatmap";
import { Tooltip as ReactTooltip } from "react-tooltip";
const HeatMap = ({ children = [] }) => {
  return (
    <>
      <CalendarHeatmap
        startDate={new Date("2022-01-01")}
        endDate={new Date("2023-01-01")}
        values={children}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        tooltipDataAttrs={(value) => {
          console.log(value);
          if (value.date === null) {
            return;
          }
          return {
            "data-tip": `${value.date.toISOString().slice(0, 10)} has count: ${
              value.count
            }`,
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
