import React, { useEffect, useContext, useState } from "react";
import "./WishlistStyle.css";

import axios from "axios";

import { userdata } from "../../pages/Dashbard";
import { CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Wishlish() {
  const userData = JSON.parse(sessionStorage.getItem('userData'))

  const { color } = useContext(userdata)

  const [coData, setCoData] = useState(null);
  const [toggled, onToggle] = useState(false);

  const [coToggled, setCoToggle] = useState(null);

  useEffect(() => {
    const fetchWishlist = async () => {
      const response = await axios.post("https://server.stat-interndb.com/getWishlist", {
        username: userData.username,
      });
      if (response.data.status == "founded") {
        setCoData(response.data.data);
        sessionStorage.setItem('wishlist', JSON.stringify(response.data.data.map((tmp)=>tmp.co_id)))
      } else if (response.data.status == "no assigned") {
        setCoData("404");
        sessionStorage.setItem('wishlist', JSON.stringify([]))
      }
    };

    fetchWishlist();
  }, []);

  function handleOnOpen(co_details) {
    onToggle(!toggled);
    setCoToggle(co_details);
  }
  function handleOnClose() {
    onToggle(!toggled);
    setCoToggle(null);
  }

  return (
    <div className="wishlistContainer" style={{ '--color': color }}>
      {toggled ? (
        <div className="cardToggle">
          <div className="cardToggleHeader">
            <h2>{coToggled.co_name}</h2>
            <div
              className="close"
              onClick={() => {
                handleOnClose();
              }}
            >
              <FontAwesomeIcon icon={faXmark} className="icon" />
            </div>
          </div>
          <h3>No. {coToggled.co_id}</h3>
          <br />
          <h3>Address</h3>
          <p>{coToggled.co_address}</p>
          <br />
          <h3>Province</h3>
          <p>{coToggled.co_prv}</p>
          <br />
          <h3>Type</h3>
          <p>{coToggled.co_type}</p>
          {/* <br />
          <h3>Conatct name</h3>
          <p>{coToggled.contact_name}</p>
          <br />
          <h3>Department</h3>
          <p>{coToggled.department}</p>
          <br />
          <h3>Phone</h3>
          <p>{coToggled.tel}</p>
          <br />
          <h3>Email</h3>
          <p>{coToggled.email}</p> */}
        </div>
      ) : coData ? (
        coData == "404" ? (
          <div className="noWishlist">
            <h3>You didn't add some wishlist yet</h3>
            <a
              onClick={() => {
                window.location.pathname = '/co-search';
              }}
            >
              <h4>add some WishList here</h4>
            </a>
          </div>
        ) : (
          <div className="wishlistContent">
            <div className="wishlistHeader">
              <h2>WishList</h2>
            </div>
            <div className="cardContainer">
              {coData.map((eachCo, index) => {
                return (
                  <div
                    className="card"
                    key={index}
                    style={{ color: color }}
                    onClick={() => {
                      handleOnOpen(
                        eachCo
                      );
                    }}
                  >
                    <p>{eachCo.co_name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )
      ) : (
        <CircularProgress />
      )}
    </div>
  );
}

export default Wishlish;
