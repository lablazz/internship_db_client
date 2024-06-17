import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../pages/Homepage/HomepageADMStyle.css";

function ManageStudent() {
  const [result, setResult] = useState(null);
  const [change, hasChange] = useState(false);

  useEffect(() => {
    const fetchStudent = () => {
      axios
        .post("https://internship-db-server-kxqk.onrender.com/manageStudent", {
          action: "fetch",
          userQuery: "",
        })
        .then((res) => {
          const { status, msg, data } = res.data;
          hasChange(false);
          if (status == "found") {
            setResult(data);
          } else if (status == "404") {
            setResult("404");
          } else {
            Swal.fire({
              title: "Oops..",
              text: msg,
              icon: status,
              showConfirmButton: false,
              timer: 4000,
            }).then(() => {
              setResult(null);
            });
          }
        });
    };
    fetchStudent();
  }, [change]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setResult("onLoad");

    const formData = new FormData(event.target);
    const id = formData.get("student");
    axios
      .post("https://internship-db-server-kxqk.onrender.com/manageStudent", {
        action: "fetch",
        userQuery: id,
      })
      .then((res) => {
        const { status, msg, data } = res.data;
        if (status == "found") {
          setResult(data);
        } else if (status == "404") {
          setResult("404");
        } else {
          Swal.fire({
            title: "Oops..",
            text: msg,
            icon: status,
            showConfirmButton: false,
            timer: 4000,
          }).then(() => {
            setResult(null);
          });
        }
      });
  };

  const handleOnDel = (data) => {
    Swal.fire({
      title: "Want to delete " + data.username,
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setResult("onLoad");
        axios
          .post("https://internship-db-server-kxqk.onrender.com/manageStudent", {
            action: "del",
            data,
          })
          .then((res) => {
            const { status } = res.body;
            if (status == "success") {
              const index = result.findIndex(
                (item) => item.username === data.username
              );
              if (index !== -1) {
                const updatedItems = [...result];
                updatedItems.splice(index, 1);
                setResult(updatedItems);
              }
            }
          });
        hasChange(true);
      }
    });
  };
  return (
    <>
      <form method="post" autoComplete="off" onSubmit={handleOnSubmit}>
        <input
          type="text"
          name="student"
          id="student"
          aria-autocomplete="off"
          autoComplete="off"
          placeholder="Please fill name or student id"
        />
        <button type="submit">
          <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        </button>
      </form>
      <div className="result-container">
        {result ? (
          result == "onLoad" ? (
            <CircularProgress />
          ) : result == "404" ? (
            <p>No user matched</p>
          ) : (
            result.map((data) => {
              return (
                <div className="each-result" key={data.username}>
                  <p>User id</p>
                  <p>{data.username}</p>
                  <p>Name</p>
                  <p>
                    {data.fname} {data.lname}
                  </p>
                  <p>Phone</p>
                  <p>{data.tel}</p>
                  <p>Email</p>
                  <p>{data.email}</p>
                  <div
                    className="btn-del"
                    onClick={() => {
                      handleOnDel(data);
                    }}
                  >
                    <FontAwesomeIcon icon={faTrash} className="icon" />
                  </div>
                </div>
              );
            })
          )
        ) : (
          <></>
        )}
      </div>
    </>
  );
}

export default ManageStudent;
