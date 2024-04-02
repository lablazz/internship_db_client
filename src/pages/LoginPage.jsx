import * as React from "react";
import axios from 'axios'

// elements

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import background from "/BgImg2.png";
import logo from "/stLogo.png";
import Swal from 'sweetalert2'
import '../assets/layout/responsive.css'

// ------------------------------------------------------- postJSON


async function postJSON(data) {
  try {
    const response = await axios.post('https://internship-db-server-kxqk.onrender.com/login', data, {
      headers: {
        'Content-Type': 'application/json'
      }})
    const status = response.data.status
    const msg = response.data.msg
    console.log(response.data.data)
    if (status == 'approve') {
      // const username = response.data.data.username
      console.log(response.data.data)
      sessionStorage.setItem('user', response.data.data.username)
      sessionStorage.setItem('userData', JSON.stringify(response.data.data))
      Swal.fire({
        title: "Success",
        text: "you are login successfully",
        icon: "success"
      }).then(() => {
        window.location = '/dashboard'
      })
    } else {
      console.log(status)
      Swal.fire({
        title: "Oop",
        text: msg,
        icon: "error",
        timer: 4000,
        showConfirmButton: false
      })
    }
  } catch (error) {
    console.error("Error: ", error);
  }
}

const handleSubmit = (event) => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  if (data.get("username") == "" || data.get("password") == "") {
    Swal.fire({
      title: "Warning",
      text: "You have to fill username and password",
      icon: 'warning'
    })
    return
  }
  const dataJson = JSON.stringify({
    username: data.get("username"),
    password: data.get("password"),
  })
  postJSON(dataJson)
};

// ------------------------------------------------------- page

function LoginPage() {
  if (sessionStorage.getItem('user')) {
    sessionStorage.clear()
  }
  return (
    <div>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "100vh",
          width: '100vw'
        }}
      >
        <form
          style={{
            width: "max(250px, 20vw)",
            display: "flex",
            flexDirection: "column",
            gap:'2vh',
            position: "absolute",
            background: "rgba(225, 225, 225, 0.8)",
            padding: "5vh",
            borderRadius: "10px",
          }}
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
    </div>
  );
}

export default LoginPage;