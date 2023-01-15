import React, { useState } from "react";
import { Button, TextField, Typography } from "@mui/material";
import axios from "axios";
import QDiff from "./QDiff";
import Tags from "./Tags";
import FindDates from "./FindDates";

const App = () => {
  const [handle, setHandle] = useState("");
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const handleSubmit = async () => {
    setErrMsg("");
    setLoading(true);
    // @ts-ignore
    setData(null);
    try {
      const response = await axios.get(
        `https://codeforces.com/api/user.status?handle=${handle.trim()}`
      );
      setData(response.data.result);
    } catch (e) {
      setErrMsg("Invalid User Handle");
    }
    setLoading(false);
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
          }
        }}
        sx={{ marginRight: "10px" }}
      />
      <Button variant="contained" onClick={handleSubmit}>
        Submit
      </Button>
      {errMsg && <Typography>{errMsg}</Typography>}
      {loading && <Typography>Loading...</Typography>}
      {data && <QDiff data={data} />}
      <br />
      <br />
      {data && <Tags data={data} />}
      <br />
      <br />
      {data && <FindDates data={data} />}
      <br />
      <br />
    </>
  );
};

export default App;
