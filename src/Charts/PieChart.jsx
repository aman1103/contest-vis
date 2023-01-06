import React from "react";
import { Chart } from "react-google-charts";
const PieChart = ({ children }) => {
  return (
    <Chart
      chartType="PieChart"
      width={"100%"}
      height={"400px"}
      options={{ pieSliceText: "none" }}
      data={children}
    />
  );
};

export default PieChart;
