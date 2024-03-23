import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import "./DocumentstoresTEAStyle.css";
import { userdata } from "../../pages/Dashbard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from 'sweetalert2'

function DocumentstoresTEA() {
  const { color } = useContext(userdata);
  const [docs, setDocs] = useState(null);
  const [addMode, useAddMode] = useState(false);
  const [change, hasChange] = useState(false)

  useEffect(() => {
    const fetchDocs = async () => {
      const response = await axios.post("http://localhost:24252/getfiles");
      const { status, data } = response.data;
      // console.log(response)
      if (status == "success") {
        setDocs(data);
        console.log(data)
      }
      if (status == "404") {
        setDocs("404");
      }
    };
    fetchDocs().then(()=>{
      hasChange(false)
    })
  }, [change]);

  const handleOnAdd = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let docsName = data.get("docsName");
    let docsLink = data.get("docsLink");
    await axios
      .post("http://localhost:24252/docsManage", {
        action: "add",
        docsName,
        docsLink,
      })
      .then((response) => {
        const {status, msg} = response.data;
        if (status == 'success') {
          Swal.fire({
            title: status,
            text: msg,
            showConfirmButton: false,
            timer: 4000,
            icon: status
          })
          hasChange(true)
        } else {
          Swal.fire({
            title: 'Oops..',
            text: msg,
            showConfirmButton: false,
            timer: 4000,
            icon: status
          })
        }
      });
  };

  const handleOnDel = (name, link) => {
    Swal.fire({
      text: 'Want to delete ?',
      icon: 'question',
      showCancelButton: true
    }).then((con_)=>{
      if (con_.isConfirmed) {
        axios.post('http://localhost:24252/docsManage', {action: 'del', docsName: name, docsLink: link})
        .then((response)=>{
          const {status, msg} = response.data
          if (status == 'success') {
            Swal.fire({
              title: status,
              text: msg,
              showConfirmButton: false,
              timer: 4000,
              icon: status
            })
            hasChange(true)
          } else {
            Swal.fire({
              title: 'Oops..',
              text: msg,
              showConfirmButton: false,
              timer: 4000,
              icon: status
            })
          }
        })
      }
    })
  }

  return (
    <div className="docsContainer" style={{ "--color": color }}>
      <div className="header">
        <h3>Documents</h3>
        <FontAwesomeIcon
          icon={addMode ? faMinus : faAdd}
          onClick={() => {
            useAddMode(!addMode);
          }}
          className="icon"
        />
      </div>
      <div className="docs-container">
        {addMode ? (
          <form method="post" onSubmit={handleOnAdd} className="addForm" autoComplete="off">
            <p>document name : </p>
            <input type="text" name="docsName" id="docsName" aria-autocomplete="off"/>
            <p>document link : </p>
            <input type="text" name="docsLink" id="docsLink" aria-autocomplete="off"/>
            <button type="submit">save</button>
          </form>
        ) : docs ? (
          docs == "404" ? (
            <h4 className="no-docs">No files</h4>
          ) : (
            docs.map((doc) => {
              return (
                <div className="eachdocs" key={doc.docs_id}>
                  <a href={doc.docs_link}>{doc.docs_name}</a>
                  <FontAwesomeIcon
                    className="icon"
                    icon={faTrash}
                    onClick={() => {
                      handleOnDel(doc.docs_name, doc.docs_link)
                    }}
                  />
                </div>
              );
            })
          )
        ) : (
          <h3>loading...</h3>
        )}
      </div>
    </div>
  );
}

export default DocumentstoresTEA;
