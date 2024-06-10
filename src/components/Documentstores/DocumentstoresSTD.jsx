import React, { useEffect, useState, useContext } from "react";
import "./DocumentstoresStyle.css";
import axios from "axios";
import { CircularProgress } from "@mui/material";

import { userdata } from "../../pages/Dashbard";

function DocumentstoresSTD() {
  const { userData, color, updateCurrentPage } = useContext(userdata);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    const getFile = async () => {
      const response = await axios.post("https://server.stat-interndb.com/getfiles");
      // console.log(response.data.data);
      if (response.data.status == "success") {
        setFiles(response.data.data);
      } else if (response.data.status == "404") {
        setFiles("404");
      } else {
        setFiles(null);
      }
    };
    getFile();
  }, []);

  return (
    <div className="documentStoreContainer" style={{ "--color": color }}>
      <div className="docsHeader">
        <h2>Documentation</h2>
      </div>
      <div className="docsBody">
        {files ? 
        files == '404' ? (
          <div className="nodocs">
            <h1>no documents</h1>
          </div>
        ) : (
          files.map((file) => {
            return (
              <a key={file.docs_id} href={file.docs_link}>
                <div className="fileCard">
                  <p className="fileName">{file.docs_name}</p>
                </div>
              </a>
            );
          })
        ) : (
          <div className="no-docts">
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentstoresSTD;
