import * as React from "react";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import SearchpageZone from "./SearchpageZone";

import '../../assets/layout/dashboardStyle.css'
import '../../assets/layout/responsive.css'

export const userdata = React.createContext();
import {
  adminNavMenu,
  stdNavMenu,
  teaNavMenu,
} from "../../components/navmenuDataset";

function Searchpage() {
  const username = sessionStorage.getItem("user");
  const userData = JSON.parse(sessionStorage.getItem("userData"));

  const [menus, setMenus] = React.useState([]);

  const [color, useColor] = React.useState("");
  const [subcolor, useSubcolor] = React.useState("");


  React.useEffect(() => {
    if (!username) {
      window.location.pathname = "/";
    }
  }, [username]);

  React.useEffect(() => {
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

  React.useEffect(() => {
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
          <div className="dashboardLayout">
            <Header setcolor={{ color, subcolor }} />
            <Sidebar userData={userData} />
            <div className="contextContainer">
              <div className="pageContainer"><SearchpageZone /></div>
            </div>
          </div>
        </userdata.Provider>
      ) : (
        <h1>Loading ...</h1>
      )}
    </>
  );
}

export default Searchpage;
