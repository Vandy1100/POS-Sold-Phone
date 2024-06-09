"use client";
import {
  useGetRequestSaleItemsQuery,
  useGetRequestSaleItemsUnitByIdQuery,
} from "@/store/features/soldItem/RequestSoldItemApi";
import { List, ListItem } from "flowbite-react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegCalendar } from "react-icons/fa6";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Link from "next/link";
import dayjs from "dayjs"; // Make sure to install dayjs library for date manipulations
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { useParams } from "next/navigation";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export default function LIstReport() {
  const { id } = useParams();
  const {
    data: saleItem,
    isLoading: saleItemIsLoading,
    error: saleItemError,
  } = useGetRequestSaleItemsUnitByIdQuery(id);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSaleItems, setFilteredSaleItems] = useState([]);
  const [totalQauntity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [search, setSearch] = useState();
  const [totalSaleIn,setTotalSaleIn] = useState(0) 
  const [totalSaleOut,setTotalSaleOut] = useState(0) 
  const [totalProfit,setTotalProfit] = useState(0) 
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  // Filter sale items based on start and end dates
  useEffect(() => {
    if (saleItem && saleItem?.data) {
      const filteredItems = saleItem?.data?.filter((item) => {
        if (startDate && endDate) {
          const saleDate = dayjs(item.saleDate);
          if (saleDate)
            return (
              saleDate.isSameOrAfter(dayjs(startDate)) &&
              saleDate.isSameOrBefore(dayjs(endDate))
            );
        } else if (search) {
          // Convert both item name and search term to lowercase for case-insensitive comparison
          const itemName = item.productName.toLowerCase();
          const searchTerm = search.toLowerCase();
          return itemName.includes(searchTerm);
        }
        return true;
      });
      setFilteredSaleItems(filteredItems);
      const total = filteredItems.reduce((sum, item) => sum + item.totalAmount, 0);
      const quantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
      const saleIn = filteredItems.reduce((sum,item)=>sum + (item.cost * item.quantity), 0);
      const saleOut = filteredItems.reduce((sum,item)=>sum + (item.totalAmount * item.quantity), 0);

      const profit = filteredItems.reduce((sum,item)=>sum + ((item.totalAmount * item.quantity) - (item.cost * item.quantity)), 0);

      setTotalSaleIn(saleIn);
      setTotalSaleOut(saleOut);
      setTotalQuantity(quantity);
      setTotalProfit(profit)
    }
  }, [saleItem, startDate, endDate, search]);

  const setDateRange = (rangeType) => {
    const today = dayjs();
    let start;
    let end;

    switch (rangeType) {
      case "today":
        start = today;
        end = today;
        break;
      case "yesterday":
        start = today.subtract(1, "day");
        end = today.subtract(1, "day");
        break;
      case "thisWeek":
        start = today.startOf("week");
        end = today.endOf("week");
        break;
      case "lastWeek":
        start = today.subtract(1, "week").startOf("week");
        end = today.subtract(1, "week").endOf("week");
        break;
      case "thisMonth":
        start = today.startOf("month");
        end = today.endOf("month");
        break;
      case "lastMonth":
        start = today.subtract(1, "month").startOf("month");
        end = today.subtract(1, "month").endOf("month");
        break;
      case "thisYear":
        start = today.startOf("year");
        end = today.endOf("year");
        break;
      case "lastYear":
        start = today.subtract(1, "year").startOf("year");
        end = today.subtract(1, "year").endOf("year");
        break;
      default:
        return;
    }

    setStartDate(start.format("YYYY-MM-DD"));
    setEndDate(end.format("YYYY-MM-DD"));
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const colunms = [
    {
      name: "Order",
      selector: (row, index) => index + 1,
      minWidth: "50px",
      maxWidth: "100px",
    },
    {
      name: "Profile",
      selector: (row) => (
        <div className="w-20">
          <img src={row.productImage} alt="Product" height={100} width={100} />
        </div>
      ),
    },
    {
      name: "Product Name",
      selector: (row) =>
        row.productName ? <div className="w-96">{row.productName}</div> : "N/A",
      minWidth: "250px",
      maxWidth: "300px",
    },
    {
      name: "Sale Date",
      selector: (row) => (row.saleDate ? row.saleDate : "N/A"),
    },
    {
      name: "Customer Name",
      selector: (row) => (row.customerName ? row.customerName : "N/A"),
    },
    {
      name: "Cashier Name",
      selector: (row) =>
        row.firstname && row.lastname
          ? row.firstname + " " + row.lastname
          : "N/A",
    },
    {
      name: "Price In",
      selector: (row) => (row.cost ? `$` + row.cost : "N/A"),
    },
    {
      name: "Price Out",
      selector: (row) => (row.totalAmount ? `$` + row.totalAmount : "N/A"),
    },
    {
      name: "Qauntity",
      selector: (row) => (row.quantity ? row.quantity : "N/A"),
    },
  ];
  return (
    <div className="bg-white w-[100%] h-auto shadow-lg mt-4 ml-4">
      <div className="bg-sky-600 w-[100%] p-[15px] mt-5 justify-between  gap-2 flex ms-1 py-4">
        <div className="ml-6  font-bold">
          <div className="text-white text-2xl ">History</div>
        </div>
        <div className="ml-24">
          <Link
            href="/sales"
            className="bg-red-600 hover:bg-red-800 text-white font-bold py-2 px-4 rounded"
          >
            Back To Sale
          </Link>
        </div>
      </div>
      <div class="flex mt-4 justify-center space-x-4 mb-4">
        <div class=" w-1/2 rounded">
          <input
            type="date"
            value={startDate}
            onChange={handleStartDateChange}
            className="date-input  w-full  rounded"
            placeholder="Select date start"
          />
        </div>
        <div class=" w-1/2  rounded">
          <input
            type="date"
            value={endDate}
            onChange={handleEndDateChange}
            className="date-input w-full  rounded"
            placeholder="Select date start"
          />
        </div>
      </div>
      <div class="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setDateRange("today")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          Today
        </button>
        <button
          onClick={() => setDateRange("yesterday")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          Yesterday
        </button>
        <button
          onClick={() => setDateRange("thisWeek")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          This Week
        </button>
        <button
          onClick={() => setDateRange("lastWeek")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          Last Week
        </button>
        <button
          onClick={() => setDateRange("thisMonth")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          This Month
        </button>
        <button
          onClick={() => setDateRange("lastMonth")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          Last Month
        </button>
        <button
          onClick={() => setDateRange("thisYear")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          This Year
        </button>
        <button
          onClick={() => setDateRange("lastYear")}
          className="bg-white border border-black px-4 py-2 rounded"
        >
          Last Year
        </button>
      </div>

      <div className="overflow-x-auto">
        {saleItem && saleItem.data ? (
          <DataTable columns={colunms} data={filteredSaleItems} pagination />
        ) : (
          <p>Data is null.</p>
        )}{" "}
      </div>

      <div class="flex gap-4 py-5 justify-end mb-4 me-4">
        <p className="text-[18px]">Total Qauntity: {totalQauntity}</p>
        <p className="text-[18px]">Total Sale In: ${totalSaleIn.toFixed(2)}</p>
        <p className="text-[18px]">Total Sale Out: ${totalSaleOut.toFixed(2)}</p>
        <p className="text-[18px]">Total Profit: ${totalProfit.toFixed(2)}</p>
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
}
