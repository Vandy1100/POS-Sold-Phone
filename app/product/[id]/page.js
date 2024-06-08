"use client";
import { useGetRequestProductCardByIdQuery } from "@/store/features/product/requestProductApi";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import dayjs from "dayjs"; // Make sure to install dayjs library for date manipulations
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import AddStockProduct from "@/components/stock/AddStockProduct";
import AddDiscount from "@/components/stock/AddDiscount";
import UpadteProduct from "@/components/product/UpdateProduct";
import AccessoryList from "@/components/accessory/AccessoryList";
import { useGetRequestAccessoriesByIdQuery } from "@/store/features/accessory/RequestAccessoryApi";
dayjs.extend(isToday);
dayjs.extend(isYesterday);
dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export default function page() {
  const { id } = useParams();
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [filteredSaleItems, setFilteredSaleItems] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  // Logging the id for debugging purposes

  const {
    data: products,
    isLoading,
    error,
  } = useGetRequestProductCardByIdQuery(id);
  const {
    data: accessories,
    isLoading: accessoriesIsLoding,
    error: accessoriesError,
  } = useGetRequestAccessoriesByIdQuery(id);
  console.log("Product ID:", products?.data);
  useEffect(() => {
    if (products?.data) {
      // Calculate the total amount from stocks
      const totalAmount =
        products?.data.quantity * products?.data?.stocks[0].cost;

      // Calculate the total price, apply discount if applicable
      const basePrice = products.data.price || 0;
      const quantity = products.data.quantity || 0;
      let totalPrice = basePrice * quantity;

      // Apply discount if it exists and is greater than 0
      if (products.data.discount && products.data.discount > 0) {
        totalPrice -= totalPrice * (products.data.discount / 100);
      }

      // Calculate the final price after subtracting the total amount
      const finalPrice = totalPrice - totalAmount;

      // Set the calculated values
      setTotalAmount(totalAmount);
      setTotalPrice(totalPrice);
      setFinalPrice(finalPrice);
    }
  }, [products]);

  useEffect(() => {
    if (products && products?.data) {
      const filteredItems = products?.data?.stocks?.filter((item) => {
        if (startDate && endDate) {
          const saleDate = dayjs(item.stockDate);
          return (
            saleDate.isSameOrAfter(dayjs(startDate)) &&
            saleDate.isSameOrBefore(dayjs(endDate))
          );
        }
        return true;
      });
      setFilteredSaleItems(filteredItems);
      const total = filteredItems.reduce((sum, item) => sum + item.amount, 0);
      setTotalCost(total);
    }
  }, [products, startDate, endDate]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

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

  const colunm = [
    {
      name: "NO",
      selector: (row) => (row.id ? row.id : "N/A"),
    },
    {
      name: "Quantity",
      selector: (row) => (row.quantity ? row.quantity : "N/A"),
    },
    {
      name: "Cost",
      selector: (row) => (row.cost ? "$" + row.cost : "N/A"),
    },
    {
      name: "Date",
      selector: (row) => (row.stockDate ? row.stockDate : "N/A"),
    },
    {
      name: "Amount",
      selector: (row) => (row.amount ? "$" + row.amount : "N/A"),
    },
  ];
  return (
    <div className="bg-white h-auto shadow-lg mt-4 ml-4 w-[1020px] ">
      <div className="bg-sky-600 p-[15px] ">
        <div className="ml-6  font-bold">
          <div className="text-white ">Product Card</div>
        </div>
      </div>

      <div class=" mx-auto p-6  bg-white shadow-md rounded-lg">
        <div class="flex">
          <div class="w-1/4 rounded-md bg-blue-400 h-60">
            <img
              src={products?.data?.productImage}
              alt="product"
              className="w-full h-full"
            />
          </div>
          <div class="w-2/4 px-4 space-y-2">
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="font-bold">Product Name :</p>
                <p>{products?.data ? products?.data?.name : "N/A"}</p>
              </div>
              <div>
                <p class="font-bold">Cost :</p>
                <p>
                  $
                  {products?.data?.stocks[0]
                    ? products?.data?.stocks[0].cost
                    : 0}
                </p>
              </div>
              <div>
                <p class="font-bold">Quantity :</p>
                <p>{products?.data ? products?.data?.quantity : 0}</p>
              </div>
              <div>
                <p class="font-bold">Price :</p>
                <p>${products?.data ? products?.data?.price : 0}</p>
              </div>
              <div>
                <p class="font-bold">Category :</p>
                <p>
                  {products?.data ? products?.data?.category?.category : "N/A"}
                </p>
              </div>
              <div>
                <p class="font-bold">Total purchases​​ :</p>
                <p>${totalAmount.toFixed(2)}</p>
              </div>
              <div>
                <p class="font-bold">Date :</p>
                <p>{products?.data ? products?.data?.productDate : "N/A"}</p>
              </div>
              <div>
                <p class="font-bold">Total sales:</p>
                <p>${totalPrice.toFixed(2)}</p>
              </div>
              <div>
                <p class="font-bold">Discount :</p>
                <p>{products?.data ? products?.data?.discount : 0}%</p>
              </div>
              <div>
                <p class="font-bold">profit :</p>
                <p>${finalPrice.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div class="w-1/4 flex flex-col space-y-2">
            <AddDiscount id={products?.data?.id} />
            <AddStockProduct id={products?.data?.id} />
            <UpadteProduct id={products?.data?.id} />
            <AccessoryList id={products?.data?.id} />
            <div class="bg-red-600 hover:bg-red-800 text-white block text-center px-4 py-2 rounded">
              <Link href={`/product/index_product`}>Back</Link>
            </div>
          </div>
        </div>
        <div className="w-auto mt-2">
          <h className="text-[18px] font-bold">
            Accessory Bundle<p className="text-green-400 text-[14px]">Free</p>
          </h>
          <div className="flex flex-wrap gap-4">
            {accessories?.data?.map((item, index) => (
              <div key={index}>
                <p className="mb-2">{item.accessory}</p>
                <img
                  className="w-[60px] mx-2"
                  src={item.image}
                  alt={item.accessory}
                />
              </div>
            ))}
          </div>
        </div>
        <hr className="mt-4 h-[2px] bg-slate-600" />

        <div class="bg-white p-6 rounded-lg">
          <div className="bg-sky-600 p-[15px] mb-4">
            <div className="ml-6  font-bold">
              <div className="text-white ">History</div>
            </div>
          </div>
          <div class="flex justify-center space-x-4 mb-4">
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
            {products && products.data ? (
              <DataTable columns={colunm} data={filteredSaleItems} pagination />
            ) : (
              <p>Data is null.</p>
            )}{" "}
          </div>
          <div class="flex justify-end">
            <p>Total Amount: ${totalCost}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
