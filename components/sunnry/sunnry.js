"use client"
import { useGetRequestReportsPieChartQuery } from "@/store/features/report/RequestReportApi";
// import "./styles.css";
import React, { useCallback, useState } from "react";
import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 },
  { name: "Group D", value: 200 }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#E01185", "#FFD700"];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
const Sunnry =()=> {

 const{data:pie,isLoading,error} = useGetRequestReportsPieChartQuery()


  return (
    <>
    <div className="relative">
  <PieChart width={400} height={400} className="absolute ml-[80px] inset-0">
    <Pie
      data={pie?.data}
      cx={150}
      cy={150}
      labelLine={false}
      label={renderCustomizedLabel}
      outerRadius={80}
      fill="#8884d8"
      dataKey="quantity"
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
  <Legend
    layout="horizontal"
    height={100} 
    width={300} 
    payload={pie?.data.map((entry, index) => ({
      value: entry.dayOfWeek, // Assuming 'dayOfWeek' is the property in your data
      type: 'circle', // You can change this to 'square' or 'rect' based on your preference
      color: COLORS[index % COLORS.length],
    }))}
    iconSize={10} 
    fontSize={8}
  />
    </PieChart>
</div>


    </>
  );
}
export default Sunnry;