import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Label
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p>{label}</p>
        <p>{`นักศึกษาที่สนใจ : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

function BarchartWishlist() {
  const [data, setDT] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDT = async () => {
      try {
        const res = await axios.get("https://internship-db-server-kxqk.onrender.com/data?col=wishlist")
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

  return (
    <>
      <h3>หน่วยงานที่นักศึกษาลงทะเบียน wishlist ไว้ 10 อันดับแรก</h3>
      <div className="charts">
        <ResponsiveContainer width="100%" minHeight={300}>
          <BarChart data={data}>
            <XAxis dataKey="co_name" stroke="#8884d8">
              <Label content={({ value }) => value?.substring(0, 10)} />
            </XAxis>
            <YAxis stroke="#8884d8" />
            <Tooltip content={<CustomTooltip />} />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Bar dataKey="count" fill="#8884d8" barSize={90} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export default BarchartWishlist;
