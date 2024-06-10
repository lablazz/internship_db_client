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

  const label = { };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = {
      querytxt: data.get("query"),
      prv: data.get("prv"),
      view: switchState,
      intern: !!data.get("492"),
      coop: !!data.get("499"),
      priv: !!data.get("priv"),
      grov: !!data.get("grov"),
    };
    const fetchResult = async () => {
      const response = await axios.post(
        "https://server.stat-interndb.com/fetchSearchResult",
        query
      );
      if (response.data.status === "no match") {
        setResult("no match");
      } else {
        setResult(response.data.data);
      }
    };
    console.log(switchState)
    fetchResult();
  };

  useEffect(()=>{
    const fetchResult = async () => {
      let query = {
        querytxt: '',
        prv: '',
        view: switchState,
        intern: false,
        coop: false,
        priv: false,
        grov: false,
      }
      const response = await axios.post(
        "https://server.stat-interndb.com/fetchSearchResult",
        query
      );
      if (response.data.status === "no match") {
        setResult("no match");
      } else {
        setResult(response.data.data);
      }
    };
    fetchResult();
  }, [])

  useEffect(() => {
    const prvFetch = async () => {
      const response = await axios.post("https://server.stat-interndb.com/fetchprv");
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
      <form className="filterContainer" method="post" id="formControl" onSubmit={handleOnSubmit}>
        <div className="searchBar">
          <div className="inputBar">
            <input
              type="text"
              name="query"
              id=""
              autoComplete="off"
              placeholder="กรุณากรอกชื่อหน่วยงาน"
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
                ทุกจังหวัด
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
                <option value="">กำลังโหลด</option>
              )}
            </select>
          </div>
          <div className="coTypeBox" style={{ "--switch": color}}>
              <div className="wrap">
                <h4>ประเภทของหน่วยงาน :</h4>
              </div>
              <div className="wrap">
                <Checkbox
                  {...label}
                  name="priv"
                  color="success"
                />
                <p>บริษัทเอกชน</p>
              </div>

              <div className="wrap">
                <Checkbox
                  {...label}
                  name="grov"
                  color="success"
                />
                <p>ราชการ</p>
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
              มีนักศึกษาเคยเข้ารับการฝึกงานหรือสหกิจที่หน่วยงานแล้วเท่านั้น
            </p>
          </div>
          <div className="checkBox">
            <div className="internTypeBox" style={{ "--switch": switchState ? color : "#9c9c9c" }}>
              <div className="wrap">
                <h4>แผนการศึกษา :</h4>
              </div>
              <div className="wrap">
                <Checkbox
                  {...label}
                  name="492"
                  color="success"
                  disabled={!switchState}
                />
                <p>การฝึกงานทางสถิติ (208492)</p>
              </div>

              <div className="wrap">
                <Checkbox
                  {...label}
                  name="499"
                  color="success"
                  disabled={!switchState}
                />
                <p>สหกิจศึกษาทางสถิติ (208497)</p>
              </div>
            </div>
          </div>
        </div>
      </form>

      <div className="resultContainer">
        {queryResults ? (
          queryResults == "no match" ? (
            <h3>ไม่พบหน่วยงาน</h3>
          ) : (
            <div className="queryResult">
              {queryResults.map((result) => {
                return <PayloadCard payload={result} key={result.co_id} />;
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
