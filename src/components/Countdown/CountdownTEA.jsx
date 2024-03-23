import React, { useEffect, useState, useContext } from "react";
import { userdata } from "../../pages/Dashbard";
import "./CountdownTEAStyle.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";

function CountdownTEA() {
  const { color } = useContext(userdata);
  const [events, setEvent] = useState(null);
  const [addMode, useAddMode] = useState(false);
  const [change, hasChange] = useState(false)

  useEffect(() => {
    const fetchEvent = async () => {
      await axios
        .post("http://localhost:24252/manageTime", {
          action: "fetch",
        })
        .then((res) => {
          const { status, event } = res.data;
          if (status == "ok") {
            setEvent(event);
          } else if (status == "no event") {
            setEvent("noEvent");
          } else setEvent(null);
        //   console.log(status);
        });
        hasChange(false)
    };
    fetchEvent();
  }, [change]);

  const handleOnAdd = (event)=>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let date = data.get('date')
    let time = data.get('time')
    let name = data.get('name')
    if (name === '') {
      return;
    }
    console.log(date, time)
    axios.post("http://localhost:24252/manageTime", {
        action: 'add', date, time, name
    }).then((res)=>{
        const {status, msg} = res.data
        Swal.fire({
            title: status,
            text: msg,
            icon: status,
            showConfirmButton: false,
            timer: 4000
        })
        hasChange(true)
    })
  }

  const handleOnDel = async (id) => {
    
    await axios.post("http://localhost:24252/manageTime", {
        action: 'del', id
    }).then((res)=>{
        const {status, msg} = res.data
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

  function formatDate(date) {
    let dt = date.split('T')
    return dt[0]
  }

  return (
    <div className="timeContainer" style={{'--color': color}}>
      <div className="header">
        <h3>Add event</h3>
        <FontAwesomeIcon icon={addMode ? faMinus : faAdd} onClick={()=>{
            useAddMode(!addMode)
        }} className="icon" />
      </div>
      <div className="eventContent">
        {addMode ? (
          <form className="addBox" method="post" onSubmit={handleOnAdd} autoComplete="off">
            <h4>Event date : </h4>
            <input type='date' name="date" id="date" />
            <h4>Event time : </h4>
            <input type="time" name="time" id="time" />
            <h4>Event name : </h4>
            <input type='text' name="name" id="name" aria-autocomplete="off" />
            <button type="submit">save</button>
          </form>
        ) : (
          <div className="content">
            {events ? (
              events == "noEvent" ? (
                <h4 className="noEvent">No up-comming event</h4>
              ) : events.map((event)=>{
                return (
                    <div className="each-event" key={event.event_id}>
                        <p>Date : </p>
                        {formatDate(event.appointment_date)}
                        <p>Time : </p>
                        {event.appointment_time}
                        <p>Event name : </p>
                        {event.appointment_name}
                        <FontAwesomeIcon icon={faTrash} className="icon" onClick={()=>{
                            handleOnDel(event.event_id)
                        }}/>
                    </div>
                )
              })
            ) : (
              <h3>Loading</h3>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default CountdownTEA;
