import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Label,
  Legend,
} from "recharts";

function PiechartWorkDetail() {
  const [year, setyear] = useState("");
  const [data, setDT] = useState(null);
  const [COLORS, setCOLORS] = useState([]);

  useEffect(() => {
    const fetchData = () => {
      axios.get("https://internship-db-server-kxqk.onrender.com/data?col=workDetail").then((res) => {
        setDT(cleanData(res.data));
        setCOLORS(generateColors(res.data?.length));
      });
    };
    fetchData();
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const data = formData.get("years");

    setDT("loading");
    axios
      .get(
        data == ""
          ? "https://internship-db-server-kxqk.onrender.com/data?col=workDetail"
          : "https://internship-db-server-kxqk.onrender.com/data?col=workDetail&id=" + data
      )
      .then((res) => {
        setDT(cleanData(res.data));
        setCOLORS(generateColors(res.data?.length));
      });
  };

  function generateColors(length) {
    const colors = [];
    for (let i = 0; i < length; i++) {
      colors.push(generateRandomColor());
    }
    return colors;
  }
  function generateRandomColor() {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  }
  function cleanData(array) {
    const totalWorkCount = array.reduce(
      (sum, item) => sum + item.work_count,
      0
    );

    const arrayWithPercentages = array.map((item) => ({
      ...item,
      work_percent: Math.round((item.work_count / totalWorkCount) * 100 * 100) / 100,
    }));

    const sortedArray = arrayWithPercentages.sort(
      (a, b) => b.work_percent - a.work_percent
    );

    console.log(sortedArray);
    return sortedArray;
  }

  return (
    <>
      <div className="form-control">
        <h3>สัดส่วนประเภทงานที่ได้รับ (ร้อยละ)</h3>
        <form className="input-section" onSubmit={handleOnSubmit}>
          <input
            type="text"
            name="years"
            id="years"
            placeholder="ระบุปีพ.ศ."
            onChange={(e) => {
              setyear(e.target.val);
            }}
          />
          <button type="submit">
            <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
          </button>
        </form>
      </div>
      <div className="charts">
        {data == "loading" ? (
          <div className="loader">
            <p>
              <CircularProgress /> <br /> Loading
            </p>
          </div>
        ) : data?.some(
            (item) => item.work_detail !== null && item.work_count !== 0
          ) ? (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                dataKey="work_percent"
                nameKey="work_detail"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {data?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
                <Label valueKey="work_detail" position="inside" />
                <Label
                  content={({
                    cx,
                    cy,
                    midAngle,
                    innerRadius,
                    outerRadius,
                    value,
                    index,
                  }) => {
                    if (index === undefined) return null;
                    const RADIAN = Math.PI / 180;
                    const radius =
                      innerRadius + (outerRadius - innerRadius) * 0.5;
                    const x = cx + radius * Math.cos(-midAngle * RADIAN);
                    const y = cy + radius * Math.sin(-midAngle * RADIAN);
                    return (
                      <text
                        x={x}
                        y={y}
                        fill="#8884d8"
                        textAnchor={x > cx ? "start" : "end"}
                        dominantBaseline="central"
                      >
                        {`${data[index].work_count}`}
                      </text>
                    );
                  }}
                />
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="no-content">
            <p>No data in database</p>
          </div>
        )}
      </div>
    </>
  );
}

export default PiechartWorkDetail;
