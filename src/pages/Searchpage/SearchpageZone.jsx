import React, { useContext, useEffect, useState, useCallback } from "react";
import "../../assets/layout/searchpageStyle.css";

import { userdata } from "./Searchpage";

import Checkbox from "@mui/material/Checkbox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBars,
  faXmark,
  faCircleUp,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PayloadCard from "../../components/payloadCard/PayloadCard";
import { Switch } from "@mui/material";

function SearchpageZone() {
  const [toggle, setToggle] = useState(false);
  const [switchState, setSwitchState] = useState(true);
  const [visible, setVisible] = useState(false);

  const [queryResults, setResult] = useState(null);
  const [prvMenus, setPrvMenus] = useState(null);

  const { userData, color, subcolor } = useContext(userdata);

  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  
  useEffect(() => {
    const handleOnSubmit = (event) => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      const query = {
        querytxt: data.get("query"),
        prv: data.get("prv"),
        view: data.get("view") === "on",
        intern: !!data.get("492"),
        coop: !!data.get("499"),
        priv: !!data.get("priv"),
        grov: !!data.get("grov"),
      };
      const fetchResult = async () => {
        const response = await axios.post(
          "http://localhost:24252/fetchSearchResult",
          query
        );
        if (response.data.status === "no match") {
          setResult("no match");
        } else {
          setResult(response.data.data);
        }
      };
      
      fetchResult();
    };
    const form = document.querySelector("#formControl");
    if (form) {
      form.addEventListener("submit", handleOnSubmit);
    }

    // Clean up event listener on component unmount
    return () => {
      if (form) {
        form.removeEventListener("submit", handleOnSubmit);
      }
    };
  }, []);

  useEffect(() => {
    const prvFetch = async () => {
      const response = await axios.post("http://localhost:24252/fetchprv");
      setPrvMenus(response.data.data);
    };

    prvFetch();
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const toggleVisible = useCallback(() => {
    const scrolled = document.documentElement.scrollTop;
    setVisible(scrolled > 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisible);

    return () => {
      window.removeEventListener("scroll", toggleVisible);
    };
  }, [toggleVisible]);

  return (
    <div style={{ "--color": color }} id="searchResult">
      <form className="filterContainer" method="post" id="formControl">
        <div className="searchBar">
          <div className="inputBar">
            <input
              type="text"
              name="query"
              id=""
              autoComplete="off"
              placeholder="fill company name here"
            />
          </div>
          <button type="submit" className="confirmBox">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
          </button>
          <div
            className="toggleBox"
            onClick={() => {
              setToggle(!toggle);
            }}
          >
            <FontAwesomeIcon
              icon={!toggle ? faBars : faXmark}
              className="icon"
            />
          </div>
        </div>
        <div className="expanZone" id={toggle ? "active" : "unactive"}>
          <div className="prvBox">
            <select name="prv" id="prv">
              <option value="" defaultValue>
                all
              </option>
              {prvMenus ? (
                prvMenus.map((menu, index) => {
                  return (
                    <option value={menu.co_prv} key={index}>
                      {menu.co_prv}
                    </option>
                  );
                })
              ) : (
                <option value="">Loaing</option>
              )}
            </select>
          </div>
          <div className="checkBox">
            <div className="internTypeBox">
              <div className="wrap">
                <h4>Program :</h4>
              </div>
              <div className="wrap">
                <Checkbox {...label} name="492" color="success" />
                <p>internship (208492)</p>
              </div>

              <div className="wrap">
                <Checkbox {...label} name="499" color="success" />
                <p>co-op program (208497)</p>
              </div>
            </div>

            <div className="coTypeBox">
              <div className="wrap">
                <h4>Co-Type :</h4>
              </div>
              <div className="wrap">
                <Checkbox {...label} name="priv" color="success" />
                <p>private sector</p>
              </div>

              <div className="wrap">
                <Checkbox {...label} name="grov" color="success" />
                <p>government sector</p>
              </div>
            </div>

            <div className="switchBox">
              <Switch
                {...label}
                name="view"
                color="success"
                defaultChecked
                onChange={() => {
                  setSwitchState(!switchState);
                }}
              />
              <p style={{ "--switch": switchState ? color : "#9c9c9c" }}>
                Had been internship or co-op only
              </p>
            </div>
          </div>
        </div>
      </form>

      <div className="resultContainer">
        {queryResults ? (
          queryResults == "no match" ? (
            <h3>no company match</h3>
          ) : (
            <div className="queryResult">
              {queryResults.map((result) => {
                return (
                  <PayloadCard
                    payload={result}
                    key={result.co_id}
                  />
                );
              })}
            </div>
          )
        ) : (
          <div></div>
        )}
      </div>

      <div
        className="scrollButton"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      >
        <FontAwesomeIcon icon={faCircleUp} className="icon" />
      </div>
    </div>
  );
}

export default SearchpageZone;
