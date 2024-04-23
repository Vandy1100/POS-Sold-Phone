"use client";
import React, { useEffect } from "react";

import Chart from "../chart/chart";
import Sunnry from "../sunnry/sunnry";
import "./card.css";


const CardCreator = () => {

  return (
    <div>
      <div className="container ml-2 mt-3">
        
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

export default CardCreator;
