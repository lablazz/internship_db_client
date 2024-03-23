import React from "react";

import LoginPage from "./pages/LoginPage";
import Dashbard from "./pages/Dashbard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Searchpage from "./pages/Searchpage/Searchpage";
import UserInfo from "./pages/userinfo/UserInfo";
import SearchStudentpage from "./pages/SearchStudentpage/SearchStudentpage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/dashboard",
    element: <Dashbard />,
  },
  {
    path: "/co-search",
    element: <Searchpage />,
  },
  {
    path: "/user-info",
    element: <UserInfo />,
  },
  {
    path: "/std-search",
    element: <SearchStudentpage />,
  }
]);

function Appprovider() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Appprovider;
