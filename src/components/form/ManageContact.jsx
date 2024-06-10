import { faMagnifyingGlass, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "../../pages/Homepage/HomepageADMStyle.css";

function ManageContact() {
  const [result, setResult] = useState(null);
  const [change, hasChange] = useState(false);

  useEffect(() => {
    const fetchCompany = () => {
      axios
        .post("https://server.stat-interndb.com/manageContact", {
          action: "fetch",
          userQuery: "",
        })
        .then((res) => {
          const { status, msg, data } = res.data;
          //   console.log(status)
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
    fetchCompany();
  }, [change]);

  const handleOnSubmit = (event) => {
    event.preventDefault();
    setResult("onLoad");

    const formData = new FormData(event.target);
    const id = formData.get("company");
    axios
      .post("https://server.stat-interndb.com/manageContact", {
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
      text:
        "Want to delete " + data.co_name + " contact at" + data.contact_name,
      icon: "question",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setResult("onLoad");
        axios
          .post("https://server.stat-interndb.com/manageContact", {
            action: "del",
            data,
          })
          .then((res) => {
            const { status } = res.body;
            if (status == "success") {
              const index = result.findIndex(
                (item) => item.contact_name === data.contact_name
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
          name="company"
          id="company"
          aria-autocomplete="off"
          autoComplete="off"
          placeholder="Please fill company name or company id"
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
                <div
                  className="each-result"
                  key={data.co_id + data.contact_name}
                >
                  <p>Company</p>
                  <p>{data.co_name}</p>
                  <p>Company ID</p>
                  <p>{data.co_id}</p>
                  <p>Name</p>
                  <p>{data.contact_name}</p>
                  <p>Department</p>
                  <p>{data.department}</p>
                  <p>Phone</p>
                  <p>{data.contact_tel}</p>
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

export default ManageContact;
