import React, { useContext, useState } from "react";
import "../../assets/layout/homepagestyle.css";
import "./HomepageADMStyle.css";
import { userdata } from "../Dashbard";
import AddStudent from "../../components/form/AddStudent";
import AddCompany from "../../components/form/AddCompany";
import ManageStudent from "../../components/form/ManageStudent";
import ManageCompany from "../../components/form/ManageCompany";
import ManageContact from "../../components/form/ManageContact";

function HomepageADM() {
  const { userData, color } = useContext(userdata);
  const [std, useStd] = useState(false);
  const [com, useCom] = useState(false);

  return (
    <>
      <div className="warnning-zone">
        <h4>
          All files uploaded can't be undoed, please check files before
          uploading.
        </h4>
      </div>
      <div className="add-std" style={{ "--color": color }}>
        <div
          className="header"
          onClick={() => {
            useStd(!std);
          }}
        >
          <h2>Add new Students data</h2>
        </div>
        <AddStudent payload={{ std }} />
      </div>
      <div className="add-company" style={{ "--color": color }}>
        <div
          className="header"
          onClick={() => {
            useCom(!com);
          }}
        >
          <h2>Add new Company data</h2>
        </div>
        <AddCompany payload={{ com }} />
      </div>
      <div className="manage-student" style={{ "--color": color }}>
        <h3>Student management</h3>
        <ManageStudent />
      </div>
      <div className="manage-company" style={{ "--color": color }}>
        <h3>Company management</h3>
        <ManageCompany />
      </div>
      <div className="manage-contact" style={{ "--color": color }}>
        <h3>Contact management</h3>
        <ManageContact />
      </div>
    </>
  );
}

export default HomepageADM;
