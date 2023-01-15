import React, { useCallback, useEffect, useState } from "react";
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
    });
    // console.log(map);
    const tempData = [];
    for (let key in map) {
      const sub = map[key];
      if (map[key] < 3) {
        map[key] = 1;
      } else if (map[key] < 5) {
        map[key] = 2;
      } else {
        map[key] = 3;
      }
      tempData.push({ date: new Date(key), count: map[key], nos: sub });
    }
    // console.log(tempData);
    // @ts-ignore
    setData(tempData);
  };
  useEffect(() => {
    findSubmissionDates();
  }, []);
  if (data) {
    console.log(data);
    return <HeatMap>{data}</HeatMap>;
  } else {
    return <></>;
  }
};

export default FindDates;
