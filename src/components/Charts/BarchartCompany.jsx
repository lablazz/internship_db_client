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

function BarchartCompany() {
  const [data, setDT] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDT = async () => {
      try {
        const res = await axios.get("https://internship-db-server-kxqk.onrender.com/data?col=company")
        .then((res)=>{
          // console.log(res.data);
          setDT(res.data)
        })
      } catch (err) {
        setError(err);
        setDT([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDT();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{label}</p>
          <p>{`ฝึกงานทางสถิติ : ${payload[1].value}`}</p>
          <p>{`สหกิจศึกษาทางสถิติ : ${payload[0].value}`}</p>
          <p>{`จำนวนนักศึกษาทั้งหมด : ${parseInt(payload[0].value) + parseInt(payload[1].value)}`}</p>
        </div>
      );
    }

    return null;
  };

  return (
    <>
      <h3>หน่วยงานที่นักศึกษาเลือกไปฝึกงานหรือสหกิจมากที่สุด 5 อันดับแรก</h3>
      <div className="charts">
        <ResponsiveContainer width="100%" minHeight={300}>
          <BarChart data={data?.slice(0, 5)} className="charts">
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
            <Bar dataKey='coop_interns' fill="#fff" barSize={90} stackId='a' position="insideTop" />
            <Bar dataKey="interns" fill="#8884d8" barSize={90} stackId='a' position="insideTop" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default BarchartCompany;
