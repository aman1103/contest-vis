import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";

const App = () => {
  const [handle, setHandle] = useState("");
  const handleSubmit = async () => {
    const response = await axios.get(
      `https://codeforces.com/api/user.status?handle=${handle.trim()}`
    );
    console.log(response.data);
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
