import React, { useEffect, useState } from "react";

import "../../assets/layout/dashboardStyle.css";
import "../../assets/layout/responsive.css";
import "./SidebarStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

import { adminNavMenu, stdNavMenu, teaNavMenu } from "../navmenuDataset";

function Sidebar({ userData }) {
let navigate = useNavigate();

  const [menus, setMenus] = useState([]);
  function handleLogout() {
    sessionStorage.clear();
    navigate("/");
  }
  useEffect(() => {
    const setUserDataByRole = (role) => {
      if (role == "adm") {
        setMenus(adminNavMenu);
      } else if (role == "std") {
        setMenus(stdNavMenu);
      } else if (role == "tea") {
        setMenus(teaNavMenu);
      }
    };
    setUserDataByRole(userData.role);
  }, [userData]);

  return (
    <div className="sidebarContainer">
      <ul>
        {menus.map((menu, index) => {
          return (
            <li key={index}>
              <div className="iconContainer">
                <a
                  onClick={() => {
                    navigate(menu.pathname);
                  }}
                  key={index}
                >
                  <FontAwesomeIcon
                    icon={menu.icon}
                    className="icon"
                    style={{ "--color": menu.maincolor }}
                    id={
                      window.location.pathname == menu.pathname
                        ? "active"
                        : "inactive"
                    }
                  />
                </a>
              </div>
            </li>
          );
        })}
        <li className="setting">
          <div
            className="iconContainer"
            onClick={() => {
              navigate('/user-info')
            }}
          >
            <FontAwesomeIcon
              icon={faCircleUser}
              className="icon"
              style={{ "--color": "#B4E4FF" }}
              id={
                window.location.pathname == '/user-info'
                  ? "active"
                  : "inactive"
              }
            />
          </div>
        </li>
        <li className="logout">
          <div className="iconContainer" onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} className="icon logoutIcon" />
          </div>
        </li>
      </ul>
    </div>
  );
}

export default Sidebar;
