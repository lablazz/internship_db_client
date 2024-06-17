import React, {useState, useContext} from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { userdata } from "../../pages/Dashbard";
import '../../pages/Homepage/HomepageADMStyle.css'

function AddStudent({ payload }) {
    const { userData, color } = useContext(userdata);
  const [file, setFile] = useState(null);
  
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnAddStudent = async (event) => {
    event.preventDefault();

    if (!file) {
      Swal.fire({
        text: "Please select a file",
        icon: "warning",
        showConfirmButton: false,
        timer: 4000,
      });
      return;
    }

    const formData = new FormData();
    formData.append("studentCSV", file);

    const confirmation = await Swal.fire({
      title: "Uploading " + file.name + "?",
      text: "All files uploaded can't be undone; please check the files before uploading.",
      showCancelButton: true,
      icon: "question",
    });

    if (confirmation.isConfirmed) {
      try {
        const response = await axios.post(
          "https://internship-db-server-kxqk.onrender.com/uploadStudentCSV",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            params: {
              username: userData.username,
            },
          }
        );
        // console.log(response.data);
        const {status, msg, effect} = response.data
        Swal.fire({
          title: status,
          text: `${msg} 
          updated ${effect[1]} rows and inserted ${effect[0]} rows
          `,
          icon: status,
          showConfirmButton: false,
          timer: 4000
        })
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
  };

  return (
    <div className="body" style={{ "--view": payload.std ? "block" : "none" }}>
      <form method="post" autoComplete="off" onSubmit={handleOnAddStudent}>
        <div className="wrap">
          <p>Student data</p>
          <input
            type="file"
            name="studentCSV"
            id="studentCSV"
            accept=".csv"
            multiple={false}
            onChange={handleFileChange}
          />
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
}

export default AddStudent;
