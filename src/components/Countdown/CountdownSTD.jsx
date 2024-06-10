import React, { useContext, useEffect, useState } from "react";
import { userdata } from "../../pages/Dashbard";

import axios from "axios";
import { CircularProgress } from "@mui/material";
import "./countdownStyle.css";

function CountdownSTD() {
  const { userData, color, updateCurrentPage } = useContext(userdata);

  const [upcomingEvent, setUpcomingEvent] = useState(null);
  var [date, setDate] = useState(new Date());

  useEffect(() => {
    const fetchUpcomingEvent = async () => {
      try {
        const response = await axios.post(
          "https://server.stat-interndb.com/upcoming-event"
        );
        if (response.data.status == 'ok') {
          setUpcomingEvent(response.data.event);
        } else if (response.data.status == 'no event') {
          setUpcomingEvent("no event");
        } else {
          setUpcomingEvent(null);
        }
      } catch (error) {
        console.error("Error fetching upcoming event:", error);
      }
    };

    fetchUpcomingEvent();
  }, []);

  useEffect(() => {
    var timer = setInterval(() => setDate(new Date()), 1000);
    return function cleanup() {
      clearInterval(timer);
    };
  });

  const differenceDays = (isoDateString1, isoDateString2) => {
    const date1 = new Date(isoDateString1);
    const date2 = new Date(isoDateString2);
    const differenceMs = Math.abs(date2 - date1);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    return Math.floor(differenceMs / millisecondsPerDay);
  };

  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    return `${hours}:${minutes}:${seconds}`;
  }

  function timeDifference(time1, time2) {
    const timeToSeconds = (time) =>
      time
        .split(":")
        .reduce((acc, curr, i) => acc + curr * [3600, 60, 1][i], 0);
    const secondsToTime = (seconds) => {
      var hours = Math.floor(seconds / 3600);
      var minutes = Math.floor((seconds % 3600) / 60);
      var remainingSeconds = seconds % 60;

      var formattedTime =
        padWithZero(hours) +
        ":" +
        padWithZero(minutes) +
        ":" +
        padWithZero(remainingSeconds);

      return formattedTime;
    };

    function padWithZero(number) {
      if (number < 10) {
        return "0" + number;
      } else {
        return number;
      }
    }

    const differenceInSeconds = Math.abs(
      timeToSeconds(time1) - timeToSeconds(time2)
    );
    return secondsToTime(differenceInSeconds);
  }

  return (
    <div className="countdownContainer" style={{background: color}}>
      {upcomingEvent ? (
        upcomingEvent == "no event" ? (
          <div style={{'--color': color}} className="no-event">
            <h3>No event</h3></div>
        ) : (
          <div
            className="countdownContent"
            style={{
              background:
                differenceDays(date, upcomingEvent[0].appointment_date) < 3
                  ? "#FD8A8A"
                  : '',
            }}
          >
            <div>
              <h2>
                You Have{" "}
                <span
                  style={{
                    color:
                      differenceDays(date, upcomingEvent[0].appointment_date) <
                      3
                        ? "red"
                        : "#fff",
                  }}
                >
                  {differenceDays(date, upcomingEvent[0].appointment_date)}
                </span>{" "}
                Days and
              </h2>
            </div>
            <div>
              <h1
                style={{
                  color:
                    differenceDays(date, upcomingEvent[0].appointment_date) < 3
                      ? "red"
                      : "#fff",
                }}
              >
                {" "}
                {timeDifference(
                  formatTime(date),
                  upcomingEvent[0].appointment_time
                )}
              </h1>
            </div>
            <div>
              <h2>to do {upcomingEvent[0].appointment_name}</h2>
            </div>
          </div>
        )
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );
}

export default CountdownSTD;
