import React, { useState, useEffect } from "react";
import PieChart from "./Charts/PieChart";

const Tags = ({ data: initialData }) => {
  const map = {};
  const set = new Set();
  const [data, setData] = useState();
  const CleanData = () => {
    initialData.map((sub) => {
      const name = sub?.problem?.name;
      const tags = sub?.problem?.tags;
      const verdict = sub?.verdict;
      if (tags && !set.has(name) && verdict === "OK") {
        set.add(name);
        tags.map((tag) => {
          if (!map[tag]) {
            map[tag] = 1;
          } else {
            map[tag]++;
          }
          return tag;
        });
      }
      return sub;
    });
    // console.log(map);
    let tempData = [["Tag", "No. of problems solved"]];
    for (let key in map) {
      tempData.push([`${key} : ${map[key]}`, map[key]]);
    }
    //@ts-ignore
    tempData.sort((a, b) => {
      if (a[1] > b[1]) {
        return -1;
      } else if (b[1] > a[1]) {
        return 1;
      } else {
        return 0;
      }
    });
    // console.log(tempData);
    // @ts-ignore
    setData(tempData);
  };
  useEffect(() => {
    CleanData();
  }, []);
  return <PieChart>{data}</PieChart>;
};

export default Tags;
