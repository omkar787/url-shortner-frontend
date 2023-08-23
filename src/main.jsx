import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect } from "react-router-dom";
import axios from "axios";
import Redirect from "./pages/Redirect.jsx";

const checkIfAuthorised = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api`, {
      headers: {
        "auth-token": token,
      },
    });
    console.log(res);
    return null;
  } catch (error) {
    console.log(error);
    return redirect("/login");
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: checkIfAuthorised,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/s/:code",
    element: <Redirect />,
    loader: ({ params }) => {
      return redirect(
        `${import.meta.env.VITE_BACKEND_URL}/redirect/${params.code}`
      );
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
