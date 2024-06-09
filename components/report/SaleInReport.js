"use client";
import { useGetRequestSaleItemsQuery } from "@/store/features/soldItem/RequestSoldItemApi";
import { List, ListItem } from "flowbite-react";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { FaRegCalendar } from "react-icons/fa6";
import dayjs from 'dayjs'; // Make sure to install dayjs library for date manipulations
import isToday from 'dayjs/plugin/isToday';
import isYesterday from 'dayjs/plugin/isYesterday';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useGetRequestTopSaleQuery } from "@/store/features/report/RequestReportApi";
import { useGetRequestProductStocksQuery } from "@/store/features/product/requestProductApi";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
export default function SaleInReport() {
    const {
        data: product_sale_in,
        isLoading,
        error,
      } = useGetRequestProductStocksQuery();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSaleItems, setFilteredSaleItems] = useState([]);
  const [totalQauntity,setTotalQuantity] = useState(0) 
  const [totalSaleIn,setTotalSaleIn] = useState(0) 
  const [totalSaleOut,setTotalSaleOut] = useState(0) 
  const [totalProfit,setTotalProfit] = useState(0) 
  const [search, setSearch] = useState();
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  // Filter sale items based on start and end dates
  useEffect(() => {
    if (product_sale_in && product_sale_in?.data) {
        const filteredItems = product_sale_in?.data?.filter((item) => {
            if (startDate && endDate) {
                const saleDate = dayjs(item.productDate);
                return (
                    saleDate.isSameOrAfter(dayjs(startDate)) && saleDate.isSameOrBefore(dayjs(endDate))
                );
            }
            else if (search) {
              // Convert both item name and search term to lowercase for case-insensitive comparison
              const itemName = item.name.toLowerCase();
              const searchTerm = search.toLowerCase();
              return itemName.includes(searchTerm);
            }
            return true;
        });
        setFilteredSaleItems(filteredItems);
        const total = filteredItems.reduce((sum, item) => sum + item.totalAmount, 0);
        const quantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0);
        const saleIn = filteredItems.reduce((sum,item)=>sum + (item.stocks[0].cost * item.quantity), 0);
        const saleOut = filteredItems.reduce((sum,item)=>sum + (item.price * item.quantity), 0);

        const profit = filteredItems.reduce((sum,item)=>sum + (item.totalAmount - (item?.stock?.cost * item.quantity)), 0);

        setTotalSaleIn(saleIn);
        setTotalSaleOut(saleOut);
        setTotalQuantity(quantity);
        setTotalProfit(profit)
    }
}, [product_sale_in, startDate, endDate,search]);



const setDateRange = (rangeType) => {
    const today = dayjs();
    let start;
    let end;

    switch (rangeType) {
        case 'today':
            start = today;
            end = today;
            break;
        case 'yesterday':
            start = today.subtract(1, 'day');
            end = today.subtract(1, 'day');
            break;
        case 'thisWeek':
            start = today.startOf('week');
            end = today.endOf('week');
            break;
        case 'lastWeek':
            start = today.subtract(1, 'week').startOf('week');
            end = today.subtract(1, 'week').endOf('week');
            break;
        case 'thisMonth':
            start = today.startOf('month');
            end = today.endOf('month');
            break;
        case 'lastMonth':
            start = today.subtract(1, 'month').startOf('month');
            end = today.subtract(1, 'month').endOf('month');
            break;
        case 'thisYear':
            start = today.startOf('year');
            end = today.endOf('year');
            break;
        case 'lastYear':
            start = today.subtract(1, 'year').startOf('year');
            end = today.subtract(1, 'year').endOf('year');
            break;
        default:
            return;
    }

    setStartDate(start.format('YYYY-MM-DD'));
    setEndDate(end.format('YYYY-MM-DD'));
};

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const colunms = [
    {
      name: "NO",
      selector: (row, index) => index + 1,
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
        row.name ? <div className="w-96">{row.name}</div> : "N/A",

    },
    {
      name: "Sale Date",
      selector: (row) => (row.productDate ? row.productDate  : "N/A"),
    },
    {
        name: "Qauntity",
        selector: (row) => (row.quantity ? row.quantity : "N/A"),
      },
    {
      name: "Price In",
      selector: (row) => (row.stocks? `$` + row.stocks[0].cost : "N/A"),
    },
    {
        name: "Price Out",
        selector: (row) => (row.price? `$` + row.price : "N/A"),
      }

    
  ];

  return (
    <div className="bg-white w-[100%] h-auto shadow-lg mt-4 ml-4">
      <div className="bg-sky-600 w-[100%] p-[15px] mt-5 justify-between  gap-2 flex ms-1 py-4">
      <div className="ml-6  font-bold">
              <div className="text-white text-2xl ">Sale In Report</div>
            </div>
            <div className="ml-24">
            <div className="flex align-middle">
                <form onChange={handleSearch}>
                  <button
                    type="submit"
                    data-collapse-toggle="navbar-search"
                    aria-controls="navbar-search"
                    aria-expanded="false"
                    className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                  <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search icon</span>
                    </div>
                    <input
                      type="search"
                      id="search-navbar"
                      className="block xl:w-[12rem] md:w-[18rem] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search..."
                    />
                  </div>
                </form>
              </div>{" "}
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
          <button onClick={() => setDateRange('today')} className="bg-white border border-black px-4 py-2 rounded">Today</button>
                    <button onClick={() => setDateRange('yesterday')} className="bg-white border border-black px-4 py-2 rounded">Yesterday</button>
                    <button onClick={() => setDateRange('thisWeek')} className="bg-white border border-black px-4 py-2 rounded">This Week</button>
                    <button onClick={() => setDateRange('lastWeek')} className="bg-white border border-black px-4 py-2 rounded">Last Week</button>
                    <button onClick={() => setDateRange('thisMonth')} className="bg-white border border-black px-4 py-2 rounded">This Month</button>
                    <button onClick={() => setDateRange('lastMonth')} className="bg-white border border-black px-4 py-2 rounded">Last Month</button>
                    <button onClick={() => setDateRange('thisYear')} className="bg-white border border-black px-4 py-2 rounded">This Year</button>
                    <button onClick={() => setDateRange('lastYear')} className="bg-white border border-black px-4 py-2 rounded">Last Year</button>
          </div>

      <div className="overflow-x-auto">
        {product_sale_in && product_sale_in.data ? (
          <DataTable columns={colunms} data={filteredSaleItems} pagination />
        ) : (
          <p>Data is null.</p>
        )}{" "}
      </div>

      <div class="flex gap-4 py-5 justify-end mb-4 me-4">
            <p className="text-[18px]">Total Qauntity: {totalQauntity}</p>
            <p className="text-[18px]">Total Sale In Price: ${totalSaleIn}</p>
            <p className="text-[18px]">Total Sale Out Price: ${totalSaleOut}</p>

          </div>

      <div>
        <div></div>
      </div>
    </div>
  );
}
