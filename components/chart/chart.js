
"use client"

import { useGetRequestReportsChartQuery } from "@/store/features/report/RequestReportApi";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];

const CustomXAxisTick = ({ x, y, payload }) => {
  return <text x={x} y={y} dy={16} textAnchor="middle" fill="#666">{payload.value}</text>;
};

const Chart = () => {
  
  const {data:chart,isLoading,error} = useGetRequestReportsChartQuery();

  return (
    <div className="container">
    <BarChart
      width={740}
      height={300}
      data={chart?.data}
      margin={{
        top: 10,
        right: 30,
        left: 20,
        bottom: 5
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="dayOfWeek" tick={<CustomXAxisTick />} />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="quantity" fill="#8884d8" />
      <Bar dataKey="customer" fill="#82ca9d" />
    </BarChart>
    </div>
  );
}
export default Chart;
