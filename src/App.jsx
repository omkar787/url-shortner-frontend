import { Button, TextField } from "@mui/material";
import axios from "axios";
import { useLayoutEffect, useRef, useState } from "react";
import { useParams, redirect } from "react-router-dom";

const App = () => {
  const [link, setLink] = useState(null);
  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/shorten", {
      og_url: link,
    });

    console.log(res.data);
  };

  return (
    <div>
      <h1>Hello, Omkar Here</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <TextField
          value={link}
          onChange={(e) => setLink(() => e.target.value)}
          required
          variant="outlined"
        ></TextField>
        <Button type="submit" variant="outlined">
          Shorten
        </Button>
      </form>
    </div>
  );
};

export default App;
