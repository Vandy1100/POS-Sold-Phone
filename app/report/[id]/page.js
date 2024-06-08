"use client"
import { useGetRequestSaleItemByIdQuery, useGetRequestSaleItemsQuery } from '@/store/features/soldItem/RequestSoldItemApi';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react'

export default function page() {
    const { id } = useParams();
    const {data:saleItem,isLoading,error} = useGetRequestSaleItemByIdQuery(id);
    console.log("sale",saleItem)
  return (
    <div className="bg-white h-auto shadow-lg mt-4 ml-4 w-[1020px] ">
    <div className="bg-sky-600 p-[15px] ">
      <div className="ml-6  font-bold">
        <div className="text-white ">Report Card</div>
      </div>
    </div>

    <div class=" mx-auto p-6  bg-white shadow-md rounded-lg">
      <div class="flex relative">
        <div class="w-1/4 rounded-md bg-blue-400 h-60">
        <img src={saleItem?.data?.productImage} alt="product" className="w-full h-full" />
        </div>
        <div class="w-2/4 px-4 space-y-2">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="font-bold">Product Name :</p>
              <p>{saleItem?.data ? saleItem?.data?.productName : "N/A"}</p>
            </div>
            <div>
              <p class="font-bold">Amount :</p>
              <p>${saleItem?.data ? saleItem?.data?.totalAmount : "N/A"}</p>
            </div>
            <div>
              <p class="font-bold">Customer Name :</p>
              <p>{saleItem?.data ? saleItem?.data?.customerName : "N/A"}</p>
            </div>
            <div>
              <p class="font-bold">Cashier Name :</p>
              <p>{saleItem?.data ? saleItem?.data?.firstname +" "+ saleItem?.data?.lastname : "N/A"}</p>
            </div>
            <div>
              <p class="font-bold">Sale Date :</p>
              <p>{saleItem?.data ? saleItem?.data?.saleDate : "N/A"}</p>
            </div>
            <div>
              <p class="font-bold">Quantity​​ :</p>
              <p>{saleItem?.data ? saleItem?.data?.quantity: 0}</p>
            </div>
            <div>
              <p class="font-bold">Warranty Date :</p>
              <p>{saleItem?.data ? saleItem?.data?.saleDetail?.warrantyDate : "N/A"}</p>
            </div>
            <div>
              <p class="font-bold">IME:</p>
              <p>{saleItem?.data ? saleItem?.data?.saleDetail?.ime : "N/A"}</p>
            </div>
          </div>
        </div>
        <div class="w-1/6 absolute right-0 bottom-0 flex flex-col   space-y-2">
          <div class="bg-red-600  hover:bg-red-800  text-white block text-center px-4 py-2 rounded">
            <Link href={`/report`}>Back</Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  )
}
