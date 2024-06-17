import * as React from "react";
import axios from "axios";

// elements

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import background from "/BgImg2.png";
import logo from "/stLogo.png";
import Swal from "sweetalert2";
import "../assets/layout/responsive.css";
import "../assets/layout/loginStyle.css";
import { useNavigate } from "react-router-dom";

// ------------------------------------------------------- page

function LoginPage() {
  let navigate = useNavigate();

  if (sessionStorage.getItem("user")) {
    sessionStorage.clear();
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("username") == "" || data.get("password") == "") {
      Swal.fire({
        title: "Warning",
        text: "You have to fill username and password",
        icon: "warning",
        timer: 4000,
        showConfirmButton: false,
      });
      return;
    }

    const dataJson = {
      username: data.get("username"),
      password: data.get("password"),
    };

    const response = await axios.post("https://internship-db-server-kxqk.onrender.com/login", dataJson);
    const status = response.data.status;
    const msg = response.data.msg;
    console.log(response.data.data);
    if (status == "approve") {
      // console.log(response.data.data);
      sessionStorage.setItem("user", response.data.data.username);
      sessionStorage.setItem("userData", JSON.stringify(response.data.data));
      Swal.fire({
        title: "Success",
        text: "you are login successfully",
        icon: "success",
        timer: 4000,
        showConfirmButton: false,
      }).then(() => {
        navigate("/dashboard");
      });
    } else {
      console.log(status);
      Swal.fire({
        title: "Oop",
        text: msg,
        icon: "error",
        timer: 4000,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`
      }}
      className="login-bg"
    >
      <form
        noValidate
        autoComplete="off"
        method="post"
        onSubmit={handleSubmit}
        className="loginFrom"
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            width: "10vmin",
            margin: "0 auto",
          }}
        />
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{
            borderColor: "",
          }}
          name="username"
        />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          type="password"
          name="password"
        />
        <Button
          type="submit"
          variant="outlined"
          sx={{ m: "0 auto", width: "100%" }}
        >
          Sign In
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
