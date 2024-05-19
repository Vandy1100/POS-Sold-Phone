"use client";
import { useGetRequestSaleItemsQuery } from "@/store/features/soldItem/RequestSoldItemApi";
import { List, ListItem } from "flowbite-react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegCalendar } from "react-icons/fa6";
export default function LIstReport() {
  const {
    data: saleItem,
    isLoading: saleItemIsLoading,
    error: saleItemError,
  } = useGetRequestSaleItemsQuery();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSaleItems, setFilteredSaleItems] = useState([]);
  console.log("report", saleItem);
  // Filter sale items based on start and end dates
  useEffect(() => {
    if (saleItem && saleItem.data) {
      const filteredItems = saleItem.data.filter((item) => {
        if (startDate && endDate) {
          const saleDate = new Date(item.saleDate);
          return (
            saleDate >= new Date(startDate) && saleDate <= new Date(endDate)
          );
        }
        return true;
      });
      setFilteredSaleItems(filteredItems);
    }
  }, [saleItem, startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const colunms = [
    {
      name: "Order",
      selector: (row) => (row.saleItemId ? "#" + row.saleItemId : "N/A"),
      minWidth: "50px",
      maxWidth: "100px"
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
        maxWidth: "300px"
    },
    {
      name: "Sale Date",
      selector: (row) => (row.saleDate ? row.saleDate : "N/A"),
    },
    {
      name: "Custmer Name",
      selector: (row) => (row.customerName ? row.customerName : "N/A"),
    },

    {
      name: "Customer Phone Number",
      selector: (row) => (row.phone ? row.phone : "N/A"),
    },
    {
      name: "Cashier Name",
      selector: (row) =>
        row.firstname && row.lastname
          ? row.firstname + " " + row.lastname
          : "N/A",
          minWidth: "80px",
          maxWidth: "120px"
    },
    {
      name: "Total Amount",
      selector: (row) => (row.totalAmount ? `$` + row.totalAmount : "N/A"),
      minWidth: "80px",
      maxWidth: "100px"
    },
    {
      name: "Qauntity",
      selector: (row) => (row.quantity ? row.quantity : "N/A"),
      minWidth: "40px",
      maxWidth: "60px"
    },
    {
      name: "Warranty Date",
      selector: (row) =>
        row?.saleDetail?.warrantyDate
          ? row?.saleDetail?.warrantyDate
          : "N/A",
          minWidth: "140px",
          maxWidth: "200px"
  
    },
    {
      name: "IME",
      selector: (row) =>
        row?.saleDetail?.ime
          ? row?.saleDetail?.ime
          : "N/A",
          minWidth: "175px",
          maxWidth: "250px"
    },
    {},
  ];

  return (
    <div className="bg-white w-[100%] h-auto shadow-lg mt-4 ml-4">
      <div className="bg-sky-600 w-[100%] p-[15px]">
        <div className="ml-6 flex flex-wrap justify-between font-bold">
          <div className="text-white my-2">List Products</div>
          <div className="relative  border-slate-950  flex flex-row  box-sizing-border">
            <div className="flex items-center">
              <div className="flex items-center">
                <div className="relative ">
                  <input
                    type="date"
                    value={startDate}
                    onChange={handleStartDateChange}
                    className="date-input"
                    placeholder="Select date start"
                  />
                </div>
                <span className="mx-4 text-gray-100">to</span>
                <div className="relative">
                  <input
                    type="date"
                    value={endDate}
                    onChange={handleEndDateChange}
                    className="date-input"
                    placeholder="Select date end"
                  />
                </div>
              </div>

              <div></div>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        {saleItem && saleItem.data ? (
          <DataTable columns={colunms} data={filteredSaleItems} pagination />
        ) : (
          <p>Data is null.</p>
        )}{" "}
      </div>

      <div>
        <div></div>
      </div>
    </div>
  );
}
