import React, { useState, useContext } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { userdata } from "../../pages/Dashbard";
import "../../pages/Homepage/HomepageADMStyle.css";

function AddCompany({ payload }) {
  const userData = useContext(userdata);
  const [companyNameFile, setCompanyNameFile] = useState(null);
  const [companyContactFile, setCompanyContactFile] = useState(null); // Added
  const [commentsFile, setCommentsFile] = useState(null); // Added
  const [internFile, setInternFile] = useState(null); // Added

  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  const handleUpload = async (event, file, handler) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append(
      file,
      handler === "comments" ? commentsFile 
      : handler === "companyContacts" ? companyContactFile 
      : handler === 'interns' ? internFile 
      : companyNameFile
    );
    await handleOnAddCompany(formData);
  };

  const handleOnAddCompanyName = (event) => {
    handleUpload(event, 'companyName', 'companyName');
  };

  const handleOnAddCompanyContacts = (event) => {
    handleUpload(event, 'companyContacts', 'companyContacts');
  };

  const handleOnAddCompanyComments = (event) => {
    handleUpload(event, 'comments', 'comments');
  };

  const handleOnAddCompanyInterns = (event) => {
    handleUpload(event, 'interns', 'interns');
  }

  const handleOnAddCompany = async (formData) => {
    try {
      const response = await axios.post(
        "https://internship-db-server-kxqk.onrender.com/uploadCompanyData",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          params: {
            username: userData.username,
          },
        }
      );
      const {status, msg, effect} = response.data
      console.log(effect)
      Swal.fire({
        title: status,
        text: `${msg} 
        updated ${effect[2]} rows and inserted ${effect[1]} rows
        `,
        icon: status,
        showConfirmButton: false,
        timer: 4000
      })
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div className="body" style={{ "--view": payload.com ? "block" : "none" }}>
      <form method="post" autoComplete="off" onSubmit={handleOnAddCompanyName}>
        <div className="wrap">
          <p>Company details</p>
          <input
            type="file"
            name="companyName"
            id="companyName"
            accept=".csv"
            multiple={false}
            onChange={(e) => handleFileChange(e, setCompanyNameFile)}
          />
          <button type="submit">Upload</button>
        </div>
      </form>
      <form method="post" autoComplete="off" onSubmit={handleOnAddCompanyContacts}>
        <div className="wrap">
          <p>Company contacts</p>
          <input
            type="file"
            name="companyContacts"
            id="companyContacts"
            accept=".csv"
            multiple={false}
            onChange={(e) => handleFileChange(e, setCompanyContactFile)}
          />
          <button type="submit">Upload</button>
        </div>
      </form>
      <form method="post" autoComplete="off" onSubmit={handleOnAddCompanyInterns}>
        <div className="wrap">
          <p>Company internships</p>
          <input
            type="file"
            name="interns"
            id="interns"
            accept=".csv"
            multiple={false}
            onChange={(e) => handleFileChange(e, setInternFile)}
          />
          <button type="submit">Upload</button>
        </div>
      </form>
      <form method="post" autoComplete="off" onSubmit={handleOnAddCompanyComments}>
        <div className="wrap">
          <p>Company comments</p>
          <input
            type="file"
            name="comments"
            id="comments"
            accept=".csv"
            multiple={false}
            onChange={(e) => handleFileChange(e, setCommentsFile)}
          />
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
}

export default AddCompany;
