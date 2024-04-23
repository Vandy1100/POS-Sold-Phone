"use client";
import React, { useEffect } from "react";
import { FaUsers } from "react-icons/fa";
import Chart from "../chart/chart";
import Sunnry from "../sunnry/sunnry";
import Transaction from "../transactions/transaction";
import "./card.css";
import {
  useGetRequestReportsCustomerQuery,
  useGetRequestReportsDailyQuery,
  useGetRequestReportsTotalSoldQuery,
} from "@/store/features/report/RequestReportApi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useGetRequestUsersQuery } from "@/store/features/auth/authApiSlice";

const Card = () => {
  const {
    data: daily,
    isLoading: dailyIsLoading,
    error: dailyError,
  } = useGetRequestReportsDailyQuery();
  const {
    data: total,
    isLoading: totalIsLoading,
    error: totalError,
  } = useGetRequestReportsTotalSoldQuery();
  const {
    data: customer,
    isLoading: customerIsLoading,
    error: cumstomerError,
  } = useGetRequestReportsCustomerQuery();
  const {
    data: user,
    isLoading: userIsLoading,
    error: userError,
  } = useGetRequestUsersQuery();
  if (user?.data) {
    console.log(user?.data?.length); // Length of the user.data array
  } else {
    console.log("User data is empty or undefined");
  }
  if (dailyIsLoading)
    return (
      <div className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-200 bg-opacity-75 z-50">
        <div
          className="animate-spin w-16 h-16 border-[3px] border-current border-t-transparent text-purple-600 rounded-full"
          role="status"
          aria-label="loading"
        >
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  return (
    <div>
      <div className="container ml-2 mt-3">
        <div className=" items-center justify-between gap-[35px] mt-5 md:mt-8 grid  md:grid-cols-4 lg:grid-cols-4 sm:grid-cols-4  md:w-full">
          <div className="bg-[#17a2b8] p-2 h-[140px] w-[230px] rounded">
            <div className="flex gap-2">
              <div>
                <div className="text-[14px] mx-3 my-3 text-white font-bold absolute font-['Inter']">
                  {user && user?.data && user?.data?.length || "N/A"}
                </div>

                <h3 className="absolute mt-11 mx-3 text-[18px]  text-white text-base font-bold font-['Inter']">
                  User
                </h3>
              </div>
              <div className="my-2 mx-3">
                <FaUserAlt className="contant  w-12 h-12" />
              </div>
              <div className="w-[209px] h-[39px] top-[144px] absolute bg-zinc-300 bg-opacity-40 info_fake">
                <div className="font_style">Info</div>
              </div>
            </div>
          </div>
          <div className="bg-[#28A745] p-2 h-[140px] w-[230px] rounded">
            <div className="flex gap-2">
              <div>
                <div className="text-[14px] mx-3 my-3 text-white font-bold absolute  font-['Inter']">
                  {customer?.data?.customer}
                </div>
                <h3 className="absolute mt-11 mx-3 text-[18px]  text-white text-base font-bold font-['Inter']">
                  Customer
                </h3>
              </div>
              <div>
                <FaUsers className="contant" />
              </div>
              <div className="w-[209px] h-[39px] top-[144px] absolute bg-zinc-300 bg-opacity-40 info_fake">
                <div className="font_style">Info</div>
              </div>
            </div>
          </div>
          <div className="bg-[#FFC107] p-2 h-[140px] w-[230px] rounded">
            <div className="flex gap-2">
              <div>
                <div className="text-[14px] mx-3 my-3 text-white font-bold absolute  font-['Inter']">
                  ${total?.data?.total}
                </div>
                <h3 className="absolute mt-11 mx-3 text-[18px]  text-white text-base font-bold font-['Inter']">
                  Total Sold
                </h3>
              </div>
              <div className="">
                <MdOutlineAttachMoney className="contant" />
              </div>
              <div className="w-[209px] h-[39px] top-[144px] absolute bg-zinc-300 bg-opacity-40 info_fake">
                <div className="font_style">Info</div>
              </div>
            </div>
          </div>
          <div className="bg-[#DC3545] p-2 h-[140px] w-[230px] rounded">
            <div className="flex gap-2">
              <div>
                <div className="text-[14px] mx-3 my-3 text-white font-bold absolute  font-['Inter']">
                  ${daily?.data?.daily}
                </div>
                <h3 className="absolute mt-11 mx-3 text-[18px]  text-white text-base font-bold font-['Inter']">
                  Daily Sold
                </h3>
              </div>
              <div className="my-2 mx-3">
                <FaRegCalendarAlt className="contant w-12 h-12" />
              </div>
              <div className="w-[209px] h-[39px] top-[144px] absolute bg-zinc-300 bg-opacity-40 info_fake">
                <div className="font_style">Info</div>
              </div>
            </div>
          </div>
        </div>
        {/* Sunnry */}
        <div className="flex gap-1 mt-2">
          <div className=" bg-[#D9D9D9] w-[74%] h-[328px] rounded">
            <div className="mt-2">
              <Chart />
            </div>
          </div>
          <div className=" bg-[rgb(217,217,217)] w-[23%] h-[328px] rounded">
            <div className="sunnry">
              <Sunnry />
            </div>
          </div>
        </div>
        <div className="bg-[#D9D9D9] w-[97%] mt-1 rounded">
          <div className="mt-3">
            {/* <Transaction /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
