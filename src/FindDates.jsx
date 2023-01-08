import React, { useEffect, useState } from "react";
import HeatMap from "./Charts/HeatMap";

const FindDates = ({ data: initialData }) => {
  const [data, setData] = useState();
  const map = {};

  const addTime = (start, seconds) => {
    start.setSeconds(start.getSeconds() + seconds);
    return start;
  };
  const findSubmissionDates = () => {
    initialData.map((sub) => {
      const start = new Date("1970-01-01T00:00:00Z");
      const seconds = sub?.creationTimeSeconds;
      const newDate = addTime(start, seconds);
      const year = newDate.getFullYear();
      let month = newDate.getMonth() + 1;
      if (month < 10) {
        month = `0${month}`;
      }
      let date = newDate.getDate();
      if (date < 10) {
        date = `0${date}`;
      }
      const key = `${year}-${month}-${date}`;
      if (!map[key]) {
        map[key] = 1;
      } else {
        map[key]++;
      }
      return sub;
    });
    // console.log(map);
    let tempData = [];
    for (let key in map) {
      tempData.push({ date: key, value: map[key] });
    }
    console.log(tempData);
    // @ts-ignore
    setData(tempData);
  };

  useEffect(() => {
    findSubmissionDates();
  }, []);
  return <></>;
};

export default FindDates;
