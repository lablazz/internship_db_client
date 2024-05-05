import { userdata } from "../../pages/Searchpage/Searchpage";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Button } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTrash,
  faPen,
} from "@fortawesome/free-solid-svg-icons";

import "./PayloadCardStyle.css";

function PayloadCard({ payload }) {
  const { userData, color } = useContext(userdata);
  const [wishArray, setWishArray] = useState(
    JSON.parse(sessionStorage.getItem("wishlist")) || []
  );

  const [coDetail, setCoDetail] = useState(null);
  const [contacts, setContacts] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [editMode, useEdit] = useState(false);
  const [wish, setWish] = useState(wishArray.indexOf(payload.co_id) !== -1);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      const details = await axios.post(
        "http://localhost:24252/fetchCoDetails",
        {
          co_id: payload.co_id,
        }
      );
      if (details.data.status === "founded") {
        setCoDetail(details.data.data);
        setContacts(details.data.contact);
      } else if (details.data.status === "no match") {
        setCoDetail([]);
      }
    };

    fetchCompanyDetails();
  }, [payload.co_id]);

  const handleWishlist = async (action, value) => {
    const will = await Swal.fire({
      icon: "question",
      title: `${action} to wishlist`,
      text: `Do you want to ${action} from wishlist?`,
      showCancelButton: true,
      confirmButtonText: action == "add" ? "Save" : "remove",
      confirmButtonColor: action == "add" ? "" : "#C84361",
    });

    if (will.isConfirmed) {
      const { data } = await axios.post(
        "http://localhost:24252/manageWishList",
        {
          username: userData.username,
          action,
          value,
        }
      );
      if (data.status == "success") {
        Swal.fire({
          icon: "success",
          title: action + " Successfully",
          timer: 3000,
          showConfirmButton: false,
        }).then(() => {
          setWish(!wish);
          if (action === "add") {
            let oldStr = JSON.parse(sessionStorage.getItem("wishlist")) || [];
            oldStr.push(payload.co_id);
            sessionStorage.setItem("wishlist", JSON.stringify(oldStr));
          } else if (action === "remove") {
            let oldStr = JSON.parse(sessionStorage.getItem("wishlist")) || [];
            const index = oldStr.indexOf(payload.co_id);
            if (index !== -1) {
              oldStr.splice(index, 1);
              sessionStorage.setItem("wishlist", JSON.stringify(oldStr));
            }
          }
        });
        // console.log(data);
      }
    }
  };

  const handleEdit = (action, data, at) => {
    // console.log(data)
    if (action == "edit") {
      Swal.fire({
        title: `${action} at ${at}`,
        text: data.co_name,
        input: "text",
        inputAttributes: {
          autocapitalize: "off",
          autocomplete: "off",
        },
        showCancelButton: true,
        preConfirm: async (value) => {
          let tmp = value;
          let address = document.querySelector("#address" + payload.co_id);
          let province = document.querySelector("#province" + payload.co_id);
          let cotype = document.querySelector("#type" + payload.co_id);
          const con_ = await Swal.fire({
            title: `you want to change on ${at}`,
            text: `to ${value}`,
            icon: "question",
            showCancelButton: true,
          });
          if (con_.value) {
            axios
              .post("http://localhost:24252/editCo", {
                action,
                co_id: data.co_id,
                update: value,
                col:
                  at == "Address"
                    ? "co_address"
                    : at == "Province"
                    ? "co_prv"
                    : "co_type",
              })
              .then((res) => {
                Swal.fire({
                  title: res.data.status,
                  text: `On change ${res.data.msg}`,
                  icon: res.data.status == "success" ? "success" : "error",
                  timer: 4000,
                  showConfirmButton: false,
                }).then(() => {
                  at == "Address"
                    ? (address.innerHTML = tmp)
                    : at == "Province"
                    ? (province.innerHTML = tmp)
                    : (cotype.innerHTML = tmp);
                });
              });
          }
        },
      });
    } else if (action == "del") {
      Swal.fire({
        title: "you want to delete this comment ?",
        icon: "question",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://localhost:24252/editCo", {
              action,
              std_id: data.std_id,
              co_id: data.co_id,
            })
            .then((res) => {
              Swal.fire({
                title: "delete successfully",
                icon: "success",
                text: "please reload to update comments",
                showConfirmButton: false,
                timer: 4000,
                preConfirm: () => {},
              });
            });
        }
      });
    }
  };

  return (
    <div className="payloadCard">
      <div
        className="cardHeader"
        onClick={() => {
          setToggle(!toggle);
        }}
        style={{ background: toggle ? color : "#f5dfc6" }}
      >
        <h4>
          {payload.co_name} | No.{payload.co_id}
        </h4>
        <span>
          <FontAwesomeIcon icon={toggle ? faCaretUp : faCaretDown} />
        </span>
      </div>
      <div className="cardDetail" id={toggle ? "active" : "unactive"}>
        <div className="btnContainer">
          {userData.role == "std" ? (
            <Button
              variant={wish ? "contained" : "outlined"}
              color={wish ? "error" : "success"}
              size="small"
              onClick={() => {
                handleWishlist(wish ? "remove" : "add", payload.co_id);
              }}
            >
              {wish ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          ) : (
            <Button
              variant="contained"
              color={editMode ? "error" : "success"}
              size="small"
              onClick={() => {
                useEdit(!editMode);
              }}
            >
              {editMode ? "Turn off editmode" : "Turn on editmode"}
            </Button>
          )}
        </div>
        <div className="txtwraper">
          <h4>
            ที่อยู่ :{" "}
            {editMode ? (
              <button
                className="editBtn"
                onClick={() => {
                  handleEdit("edit", payload, "Address");
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )}
          </h4>
          <p id={"address" + payload.co_id}>{payload.co_address}</p>
        </div>
        <div className="txtwraper">
          <h4>
            จังหวัด :{" "}
            {editMode ? (
              <button
                className="editBtn"
                onClick={() => {
                  handleEdit("edit", payload, "Province");
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )}
          </h4>
          <p id={"province" + payload.co_id}>{payload.co_prv}</p>
        </div>
        <div className="txtwraper">
          <h4>
            ประเภทของหน่วยงาน :{" "}
            {editMode ? (
              <button
                className="editBtn"
                onClick={() => {
                  handleEdit("edit", payload, "Type");
                }}
              >
                Edit
              </button>
            ) : (
              ""
            )}
          </h4>
          <p id={"type" + payload.co_id}>{payload.co_type}</p>
        </div>
        <div className="contact">
          {contacts &&
            (userData.role == "tea" || userData.role == "adm" ? (
              contacts.map((contact, index) => {
                return contact.contact_name ? (
                  <div className="each-contact" key={contact.contact_name}>
                    <h4>{index + 1}</h4>
                    <p>ชื่อ : {contact.contact_name}</p>
                    <p>ตำแหน่ง : {contact.department}</p>
                    <p>หมายเลขโทรศัพท์ : {contact.contact_tel}</p>
                    <p>อีเมล : {contact.email}</p>
                  </div>
                ) : (
                  <></>
                );
              })
            ) : (
              <></>
            ))}
        </div>
        <div className="txtwraper">
          <h4>นักศึกษาที่เคยเข้ารับการฝึกงานหรือสหกิจศึกษา :</h4>
          <div className="stdContainer">
            {coDetail ? (
              coDetail.length === 0 ? (
                <p>ยังไม่เคยมีนักศึกษาเข้ารับการฝึกงานหรือสหกิจศึกษา</p>
              ) : (
                <div className="commentContainer">
                  {coDetail.map((detail, index) => (
                    <div className="eachStdDetails" key={index}>
                      <div className="wrap">
                        <p>รหัสนักศึกษา : {detail.std_id} </p>
                        <p>แผนการศึกษา : {detail.intern_type}</p>
                        {(userData.role == "tea" || userData.role == "adm") &&
                        editMode &&
                        detail.comment ? (
                          <button
                            className="editBtn"
                            onClick={() => {
                              handleEdit("del", detail, "comment");
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} className="icon" />
                          </button>
                        ) : (
                          ""
                        )}
                        {detail.comment ? (
                          <p id={"comment" + detail.co_id + detail.std_id}>
                            ความคิดเห็น : {detail.comment}
                          </p>
                        ) : (
                          ""
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )
            ) : (
              <p>กำลังโหลด</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PayloadCard;
