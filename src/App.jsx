import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const App = () => {
  const [handle, setHandle] = useState("");
  const [accepted, setAccepted] = useState([]);
  const handleSubmit = async () => {
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle.trim()}`
    );
    console.log(response.data);
    const temp = response.data.result.filter(
      (submission) => submission.verdict === "OK"
    );
    console.log(temp.length);
    const set = new Set([]);
    temp.map((submission) => {
      set.add(submission.problem.name);
    });
    console.log(set.size);
    setAccepted(
      response.data.filter((submission) => submission.verdict === "OK")
    );
  };
  return (
    <>
      <TextField
        value={handle}
        label="Codeforces Handle"
        autoFocus
        onChange={(e) => setHandle(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
            console.log("Enter here");
          }
        }}
        sx={{ marginRight: "10px" }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default App;
