import axios from "axios";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useParams, redirect, useLoaderData } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { FaCopy } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import copy from "copy-to-clipboard";
import { toast } from "react-toastify";

const App = () => {
  const linkRef = useRef(null);
  const [allLinks, setAllLinks] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currLink, setCurrLink] = useState(null);
  const user = useLoaderData();

  useEffect(() => {
    console.log("User", user);
    getAllLinks();
  }, []);

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/shorten`,
        {
          id: editMode,
          og_url: currLink,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      setAllLinks((links) => {
        return links.map((e) => {
          if (e._id == editMode) {
            e.og_url = currLink;
          }
          return e;
        });
      });

      setEditMode(false);
      setCurrLink(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/shorten`,
        {
          og_url: linkRef.current.value,
        },
        {
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );

      setAllLinks((data) => [...data, res.data]);
      linkRef.current.value = "";
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/shorten`,
        {
          params: {
            id,
          },
          headers: {
            "auth-token": localStorage.getItem("token"),
          },
        }
      );
      toast(res.data.msg);
      setAllLinks((links) => {
        return links.filter((e) => e._id != id);
      });
    } catch (error) {
      console.log(error);
    }
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
      <div className="flex justify-between items-center p-5 bg-slate-400">
        <div
          className="font-bold "
          style={{
            fontFamily: "'ADLaM Display', cursive",
          }}
        >
          URL SHORTNER
        </div>
        <div>{user.name}</div>
      </div>
      <form
        className="flex items-center justify-center gap-10 bg-slate-500 p-5"
        onSubmit={handleSubmit}
      >
        <div className="">
          <input
            className="outline-none rounded-md py-3 px-5 w-96"
            type="url"
            name="url"
            id="url"
            required
            ref={linkRef}
            placeholder="https://www.google.com"
          />
        </div>
        <div>
          <button className="bg-orange-300 rounded-md px-5 py-1" type="submit">
            Shorten
          </button>
        </div>
      </form>
      <div>
        {allLinks.map((data) => {
          return (
            <div
              className="flex justify-between p-5 m-5 shadow-lg rounded-lg bg-slate-300"
              key={data._id}
            >
              <div>
                <div className="flex gap-2 items-center my-1">
                  Original URL:
                  {/* <div>{data.og_url}</div> */}
                  <div>
                    {editMode == data._id ? (
                      <form onSubmit={handleEdit}>
                        <input
                          type="url"
                          name={`${data._id}_url`}
                          id={`${data._id}_url`}
                          required
                          placeholder={data.og_url}
                          value={currLink}
                          onChange={(e) => {
                            console.log(e);
                            setCurrLink(() => e.target.value);
                          }}
                          className="rounded-full bg-gray-100 px-2 outline-none font-mono "
                        />
                      </form>
                    ) : (
                      <div>{data.og_url}</div>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 items-center my-1">
                  Shorten URL:{" "}
                  <div className="rounded-full bg-gray-400 px-2 font-mono ">
                    {`${import.meta.env.VITE_FRONTEND_URL}/s/${
                      data.short_url_code
                    }`}
                  </div>
                  <div
                    onClick={() => {
                      copy(
                        `${import.meta.env.VITE_FRONTEND_URL}/s/${
                          data.short_url_code
                        }`
                      );
                      toast("Copied to clipboard!");
                    }}
                    className="cursor-pointer"
                  >
                    <FaCopy size={12} />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1 items-center">
                <div
                  onClick={() => {
                    setEditMode(data._id);
                    setCurrLink(data.og_url);
                  }}
                  className="cursor-pointer"
                >
                  <FiEdit size={15} />
                </div>
                <div
                  onClick={() => handleDelete(data._id)}
                  className="cursor-pointer "
                >
                  <MdDelete />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
