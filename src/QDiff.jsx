import React, { useEffect, useState } from "react";
import BarChart from "./Charts/BarChart";

const QDiff = ({ data: initialData }) => {
  const map = {};
  const set = new Set();
  const [data, setData] = useState();
  const CleanData = () => {
    initialData.map((sub) => {
      const name = sub?.problem?.name;
      const rating = sub?.problem?.rating;
      const verdict = sub?.verdict;
      if (rating && !set.has(name) && verdict === "OK") {
        set.add(name);
        if (!map[rating]) {
          map[rating] = 1;
        } else {
          map[rating]++;
        }
      }
      return sub;
    });
    // console.log(map);
    let tempData = [["Rating", "No. of problems solved"]];
    for (let key in map) {
      tempData.push([key, map[key]]);
    }
    setData(tempData);
  };
  useEffect(() => {
    CleanData();
  }, []);
  return <BarChart>{data}</BarChart>;
};

export default QDiff;
