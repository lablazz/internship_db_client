import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

// ChartJS.register(ArcElement, Tooltip, Legend);
// Chart.defaults.plugins.legend.display = false

function Piechart() {
  const [type, setType] = useState(null);
  useEffect(() => {
    const fetchPrv = async () => {
      const response = await axios.post("http://localhost:24252/fetchType");
      // console.log(response)
      const { status, data } = response.data;
      if (status == "founded") {
        setType(data);
      }
    };
    fetchPrv();
  }, []);

  const data = {
    labels: type ? type.map((each) => each.intern_type) : [],
    datasets: [
      {
        label: "student count",
        data: type ? type.map((each) => each.intern_type_count) : [],
        backgroundColor: ["#36A2EB", "#FF6384"],
      },
    ],
  };

  return (
    <>
      <h3>The proportion of internships and cooperative education programs.</h3>
      <div className="display">
        <Doughnut data={data} className="charts" />
      </div>
    </>
  );
}

export default Piechart;
