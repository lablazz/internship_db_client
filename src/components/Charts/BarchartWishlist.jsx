import React, { useEffect, useState } from "react";
import axios from "axios";
import "./chart-layout.css";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Label,
} from "recharts";

function BarchartWishlist() {
  const [data, setDT] = useState(null);

  useEffect(() => {
    const fetchDT = () => {
      axios.get("https://server.stat-interndb.com/data?col=wishlist").then((res) => {
        if (res.statusText == "OK") {
          setDT(res.data);
        }
        else {
            setDT([])
        }
      });
    };
    fetchDT();
  }, []);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{label}</p>
          <p>{`นักศึกาาที่สนใจ : ${payload[0].value}`}</p>
          {/* <p>{`จำนวนนักศึกษาทั้งหมด : ${parseInt(payload[0].value) + parseInt(payload[1].value)}`}</p> */}
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <h3>หน่วยงานที่นักศึกษาลงทะเบียน wishlist ไว้ 10 อันดับแรก</h3>
      <div className="charts">
        <ResponsiveContainer width="100%" minHeight={300}>
          <BarChart data={data}>
            <XAxis
              dataKey="co_name"
              stroke="#8884d8"
              interval="preserveStartEnd"
            >
              <Label content={({ value }) => value?.substring(0, 10)} />
            </XAxis>
            <YAxis stroke="#8884d8" interval="preserveStartEnd" />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar
              dataKey="count"
              fill="#fff"
              barSize={90}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default BarchartWishlist;
