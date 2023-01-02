import React from "react";
import { Chart } from "react-google-charts";

const BarChart = ({ children }) => {
  // console.log(children);
  return <Chart chartType="Bar" width="100%" height="400px" data={children} />;
};

export default BarChart;
