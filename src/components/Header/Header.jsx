import * as React from "react";

import logo from "/stLogo.png";
import arrow from "/arrow.png";
import './HeaderStyle.css'
import '../../assets/layout/responsive.css'

export default function Header({ setcolor }) {
  
  return (
    <div
      style={{
        background: setcolor.color,
        color: setcolor.subcolor
      }}
      className="headerContainer"
    >
      <div className="logoContainer">
        <div className="logoImgContainer">
          <img src={logo} alt="" />
        </div>
        <p>Statistic Internship DB</p>
      </div>
      <div className='arrowContainer'>
        <img
          src={arrow}
          alt=""
          className="arrow"
        />
      </div>
    </div>
  );
}
