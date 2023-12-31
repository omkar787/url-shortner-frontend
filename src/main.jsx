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
import "react-responsive-modal/styles.css";
import { ChakraProvider } from "@chakra-ui/react";
import SignupCard from "./Signup.jsx";
import LoginCard from "./Login.jsx";

const checkIfAuthorised = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api`, {
      headers: {
        "auth-token": token,
      },
    });
    console.log(res);
    return res.data.user;
  } catch (error) {
    console.log(error);
    localStorage.clear();
    return redirect("/login");
  }
};

const loginLoader = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api`, {
      headers: {
        "auth-token": token,
      },
    });
    return redirect("/");
  } catch (error) {
    localStorage.clear();
    console.log(error);
    // return redirect("/login");
    return null;
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
    // element: <Login />,
    element: <LoginCard />,
    loader: loginLoader,
  },
  {
    path: "/register",
    // element: <Register />,
    element: <SignupCard />,
    loader: loginLoader,
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
    <ChakraProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </ChakraProvider>
  </React.StrictMode>
);
