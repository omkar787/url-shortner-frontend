import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, redirect } from "react-router-dom";

const App = () => {
  const [link, setLink] = useState(null);
  const [allLinks, setAllLinks] = useState([]);

  useEffect(() => {
    getAllLinks();
  }, []);

  const handleSubmit = async () => {
    const res = await axios.post("http://localhost:3000/shorten", {
      og_url: link,
    });

    console.log(res.data);
  };

  const getAllLinks = async () => {
    try {
      const token = localStorage.getItem("token");
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/shorten`,
        {
          headers: {
            "auth-token": token,
          },
        }
      );
      console.log(result);
      setAllLinks(() => result.data.urls);
    } catch (error) {
      console.log(error);
      toast(error.response.data.msg);
    }
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
        {allLinks.map((data) => {
          return (
            <div key={data._id}>
              <div>Original URL: {data.og_url}</div>
              <div>
                Shorten URL:{" "}
                {`${import.meta.env.VITE_FRONTEND_URL}/s/${
                  data.short_url_code
                }`}
              </div>
            </div>
          );
        })}
        {/* <TextField
          value={link}
          onChange={(e) => setLink(() => e.target.value)}
          required
          variant="outlined"
        ></TextField>
        <Button type="submit" variant="outlined">
          Shorten
        </Button> */}
      </form>
    </div>
  );
};

export default App;
