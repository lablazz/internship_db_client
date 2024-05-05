import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../assets/layout/dashboardStyle.css";
import "../../assets/layout/responsive.css";
import "./UserInfoStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import axios from "axios";

function UserInfo() {
  const userdata = JSON.parse(sessionStorage.getItem("userData"));
  const [reset, useReset] = useState(false);
  const [active, setActive] = useState(false);

  const handleEdit = (changeCol) => {
    function condition(value) {
      if (changeCol == "email") {
        const emailRegex = /@(?:gmail\.com|cmu\.ac\.th)$/;
        // const emailCheck = emailRegex.test(value)
        return emailRegex.test(value);
      } else if (changeCol == "minor") {
        return true;
      } else if (changeCol == "tel") {
        const check = toString(value).length == 10;
        // console.log(value)
        return check;
      } else {
        return false;
      }
    }
    Swal.fire({
      title: "Change on " + changeCol + "?",
      text: "please fill your " + changeCol,
      icon: "question",
      input: "text",
      inputAttributes: {
        autocapitalize: "off",
        autocomplete: "off",
      },
      showCancelButton: true,
      preConfirm: async (value) => {
        const con_ = await Swal.fire({
          title: `you want to change on ${changeCol}`,
          text: `to ${value}`,
          icon: "question",
          showCancelButton: true,
        });
        if (con_.value && condition(value)) {
          await axios
            .post("http://localhost:24252/updateUser", {
              where: changeCol,
              value,
              username: userdata.username,
            })
            .then((response) => {
              if (response.data.status == "success") {
                Swal.fire({
                  title: "success",
                  text: "change successfully",
                  showConfirmButton: false,
                  timer: 4000,
                  icon: "success",
                }).then(() => {
                  const txtbox = document.querySelector("#" + changeCol);
                  txtbox.innerHTML = value;
                  // console.log(value)
                  let oldStr = JSON.parse(sessionStorage.getItem("userData"));
                  if (changeCol == "email") {
                    oldStr = { ...oldStr, email: value };
                  } else if (changeCol == "minor") {
                    oldStr = { ...oldStr, minor: value };
                  } else if (changeCol == "tel") {
                    oldStr = { ...oldStr, tel: value };
                  } else {
                    oldStr = { ...oldStr };
                  }
                  sessionStorage.setItem("userData", JSON.stringify(oldStr));
                });
              } else {
                Swal.fire({
                  title: "Oop",
                  text: response.data.msg,
                  icon: "error",
                  timer: 4000,
                  showConfirmButton: false,
                });
              }
            });
        }
      },
    });
  };

  const handelOnReset = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let oldPassword = data.get("oldPassword");
    let newPassword = data.get("newPassword");
    let conPassword = data.get('conPassword');
    if (conPassword == newPassword) {
      await axios.post('http://localhost:24252/resetPassword', {
      oldPassword, newPassword, username: userdata.username
      }).then((res) => {
        const {status, msg} = res.data
        Swal.fire({
          title: status,
          text: msg,
          showConfirmButton: false,
          timer: 4000,
          icon: status == 'success' ? 'success' : 'error'
        })
        document.querySelector('#oldPassword').value = '';
        document.querySelector('#newPassword').value = '';
        document.querySelector('#conPassword').value = '';
      })
    }
  };
  
  return (
    <>
      <Header setcolor={{ color: "#B4E4FF", subcolor: "#303030" }} />
      <Sidebar userData={userdata} />
      <div className="contextContainer">
        <div className="welcomeCard">
          <h2>User Info Setting</h2>
        </div>
        <div className="userinfoContainer">
          <div className="txtwrap">
            <h3>Username</h3>
            <h4 id="username">{userdata.username}</h4>
          </div>
          <div className="txtwrap">
            <h3>Name</h3>
            <h4 id="name">
              {userdata.fname} {userdata.lname}
            </h4>
          </div>
          <div className="txtwrap">
            <h3>Email</h3>
            <h4 id="email">{userdata.email}</h4>
            <div className="edit">
              <FontAwesomeIcon
                icon={faPen}
                className="icon"
                onClick={() => {
                  handleEdit("email");
                }}
              />
            </div>
          </div>
          <div className="txtwrap">
            {userdata?.role === 'std' ? (<h3>Minor</h3>) : (<h3>Room</h3>)}
            <h4 id="minor">{userdata.minor}</h4>
            <div className="edit">
              <FontAwesomeIcon
                icon={faPen}
                className="icon"
                onClick={() => {
                  handleEdit("minor");
                }}
              />
            </div>
          </div>
          <div className="txtwrap">
            <h3>Phone</h3>
            <h4 id="tel">{userdata.tel}</h4>
            <div className="edit">
              <FontAwesomeIcon
                icon={faPen}
                className="icon"
                onClick={() => {
                  handleEdit("tel");
                }}
              />
            </div>
          </div>
        </div>
        <div
          className="reset-btn"
          onClick={() => {
            useReset(!reset);
          }}
        >
          <h3>Reset password</h3>
        </div>
        {reset ? (
          <form
            className="reset-zone"
            method="post"
            onSubmit={handelOnReset}
            onChange={()=>{
              let newPassword = document.querySelector('#newPassword').value
              let conPassword = document.querySelector('#conPassword').value
              if (newPassword == conPassword && newPassword !== '' && conPassword !== '') {
                setActive(true)
              } else {
                setActive(false)
              }
            }}
          >
            <div className="inpBox">
              <h4>old password : </h4>
              <input type="password" name="oldPassword" id="oldPassword" required/>
              <h4>New password : </h4>
              <input type="password" name="newPassword" id="newPassword" required/>
              <h4>Confirm new password : </h4>
              <input type="password" name="conPassword" id="conPassword" required/>
            </div>
            <button type="submit" disabled={!active} id={active ? "active" : "unactive"}>change password</button>
          </form>
        ) : (
          <div></div>
        )}
      </div>
    </>
  );
}

export default UserInfo;
