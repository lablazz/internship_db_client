import React, { useContext } from "react";
import '../../assets/layout/homepagestyle.css'
import '../../assets/layout/responsive.css'

import CountdownSTD from "../../components/Countdown/CountdownSTD";
import DocumentstoresSTD from "../../components/Documentstores/DocumentstoresSTD";
import Wishlish from "../../components/Wishlist/Wishlish";
import { userdata } from "../Dashbard";

function HomepageSTD() {
  const {userData, color} = useContext(userdata);
  return (
    <>
      <div className="welcomeCard" style={{ background: color }}>
        <h1>Student dashboard</h1>
        <h3>{userData.name} {userData.surname}</h3>
      </div>
      <div className="gridContainer">
        <div className="grid">
          <div className="countDownTimer">
            <CountdownSTD />
          </div>
          <div className="wishListContainer">
            <Wishlish />
          </div>
          <div className="documentStore">
            <DocumentstoresSTD />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomepageSTD;
