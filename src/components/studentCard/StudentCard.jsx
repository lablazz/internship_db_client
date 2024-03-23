import React, { useState } from "react";
import './style.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";

function StudentCard({ data }) {
    const [toggle, useToggle] = useState(false)
  return (
    <>
    <div className="cardHeader" onClick={()=>{
        useToggle(!toggle)
    }}>
        <h4 className="id">{data.username}</h4>
        <h4 className="name">{data.fname} {data.lname}</h4>
        <div className="iconContainer">
        <FontAwesomeIcon icon={toggle ? faCaretUp : faCaretDown} className="icon"/>
        </div>
    </div>
    <div className="cardBody" style={{"--view": toggle ? 'block' : 'none'}}>
      <div className="txtwrap">
        <h4>Email : </h4> <p>{data.email}</p>
      </div>
      <div className="txtwrap">
        <h4>minor : </h4> <p>{data.minor}</p>
      </div>
      <div className="txtwrap">
        <h4>Phone number : </h4> <p>{data.tel}</p>
      </div>
      <div className="txtwrap">
        <h4>Intern type : </h4> <p>{data.intern_type}</p>
      </div>
    </div>
    </>
  );
}

export default StudentCard;
