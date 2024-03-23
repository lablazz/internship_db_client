import React, { createContext, useState, useEffect } from "react";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import '../../assets/layout/dashboardStyle.css'
import '../../assets/layout/responsive.css'

export const userdata = React.createContext();
import {
  adminNavMenu,
  stdNavMenu,
  teaNavMenu,
} from "../../components/navmenuDataset";
import StudentSearchZone from "./StudentSearchZone";

function SearchStudentpage() {
  const username = sessionStorage.getItem("user");
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [menus, setMenus] = React.useState([]);

  const [color, useColor] = React.useState("");
  const [subcolor, useSubcolor] = React.useState("");

  useEffect(() => {
    if (!username) {
      window.location.pathname = "/";
    }
  }, [username]);

  useEffect(() => {
    const setUserDataByRole = (role) => {
      if (role == "admin") {
        setMenus(adminNavMenu);
      } else if (role == "std") {
        setMenus(stdNavMenu);
      } else if (role == "tea") {
        setMenus(teaNavMenu);
      }
    };
    setUserDataByRole(userData.role);
  }, [userData]);

  useEffect(() => {
    const getColorByPathname = (pathname) => {
      const foundItem = menus.find((item) => item.pathname === pathname);
      useColor(foundItem ? foundItem.maincolor : "");
      useSubcolor(foundItem ? foundItem.subcolor : "");
    };
    getColorByPathname(window.location.pathname);
  });

  return (
    <>
      {userData ? (
        <userdata.Provider value={{ userData, color, subcolor }}>
          <div className="dashboardLayout" style={{"--color": color, "--txt": subcolor}}>
            <Header setcolor={{ color, subcolor }} />
            <Sidebar userData={userData} />
            <div className="contextContainer">
              <div className="pageContainer">
                <StudentSearchZone />
              </div>
            </div>
          </div>
        </userdata.Provider>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
}

export default SearchStudentpage;
