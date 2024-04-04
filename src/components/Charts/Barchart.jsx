import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";
import Chart from "chart.js/auto";
import axios from "axios";

// Chart.defaults.plugins.legend.display = false

function Barchart() {
  const [prv, setPrv] = useState(null);
  useEffect(() => {
    const fetchPrv = async () => {
      const response = await axios.post("http://localhost:24252/fetchprv");
      // console.log(response)
      const { status, data } = response.data;
      if (status == "founded") {
        setPrv(data);
      }
    };
    fetchPrv();
  }, []);

  const sortedPrv = prv
    ? prv.sort((a, b) => b.co_prv_count - a.co_prv_count).slice(0, 5)
    : [];
  const data = {
    labels: sortedPrv.map((each) => each.co_prv),
    datasets: [
      {
        label: "student count",
        data: sortedPrv.map((each) => each.co_prv_count),
        backgroundColor: [
          "#3f5efb",
          "#6959db",
          "#9653b9",
          "#d14c8c",
          "#fc466b",
        ],
      },
    ],
  };
  const options = {
    legend: {
      display: false, // Hide the legend
    },
  };
  return (
    <>
      <h3>Top 5 provinces with the most internship or cooperative education opportunities</h3>
      <Bar data={data} className="charts" options={options} />
    </>
  );
}

export default Barchart;
