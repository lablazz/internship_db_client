import {
  faMagnifyingGlass,
  faCircleUp
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./SearchStudentpage.css";
import StudentCard from "../../components/studentCard/StudentCard";

function StudentSearchZone() {
    const [visible, setVisible] = useState(false);
  const [results, setResult] = useState(null);

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

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const query = {
      id: data.get("stdID"),
    };
    const fetchResult = async () => {
      await axios
        .post("https://internship-db-server-kxqk.onrender.com/studentquery", query)
        .then((res) => {
          const { status, data, msg } = res.data;
          if (status == "found") {
            // console.log({ status, data });
            setResult(data);
          } else if (status == "404") {
            // console.log("no data in database");
            setResult("404");
          } else {
            // console.log("none");
            setResult(null);
          }
        });
    };
    fetchResult();
  };

  return (
    <>
      <form
        className="filter"
        method="post"
        onSubmit={handleOnSubmit}
        autoComplete="off"
      >
        <input type="text" name="stdID" id="stdID" aria-autocomplete="off" placeholder="Fill name or student ID here"/>
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        </button>
      </form>
      <div className="result">
        {results ? (
          results == "404" ? (
            <h4>No student match</h4>
          ) :
            results.map((result, index) => {
              return (
                <div className="eachResult" key={index}>
                  <StudentCard data={result} />
                </div>
              );
            })
          )
        : (
          <></>
        )}
      </div>
      <div
        className="scrollButton"
        onClick={scrollToTop}
        style={{ display: visible ? "inline" : "none" }}
      >
        <FontAwesomeIcon icon={faCircleUp} className="icon" />
      </div>
    </>
  );
}

export default StudentSearchZone;
