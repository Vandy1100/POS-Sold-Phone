"use client"
import React from 'react'
import { IoMdAddCircle } from "react-icons/io";

const Add_stock = () => {
    return (
        <>
            <div>
                <div className="container mt-6 ml-10">
                    <div className="bg-white w-[90%] h-auto shadow-lg">
                        <div className="bg-sky-600 w-[100%] p-[15px] ">
                            <div className="ml-6  font-bold">
                                <div className="text-white ">Add Stocks</div>
                            </div>
                        </div>
                        <div className="p-10">
                            <form>
                                <div className="grid grid-cols-12 mt-5 ml-3">
                                    <div className="flex gap-6 ml-20">
                                        <div>
                                            <div>
                                                <label>Name Products</label>
                                            </div>
                                            <select className="block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3">
                                                <option>Name Products</option>
                                            </select>
                                        </div>
                                        <div>
                                            <div>
                                                <label>Name Category</label>
                                            </div>
                                            <select className="block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3">
                                                <option>Category</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 mt-5 ml-3">
                                    <div className="flex gap-6 ml-20">
                                        <div>
                                            <label className="font-mono">QTY</label>
                                            <input type="text" name="price" id="price" class=" block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3" placeholder="Name Product....?" />
                                        </div>
                                        <div>
                                            <label className="font-mono">Price</label>
                                            <input type="text" name="price" id="price" class=" block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3" placeholder="Price....?" />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-12 mt-5 ml-3">
                                    <div className="flex gap-6 ml-20">
                                        <div>
                                            <label className="font-mono">Date</label>
                                            <input type="date" name="price" id="price" class=" block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3" placeholder="Price....?" />
                                        </div>
                                        <div>
                                            <label className="font-mono">Uploads Image</label>
                                            <input type="file" name="" id="" class=" block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3" placeholder="Uploads Image....?" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5 ml-3">
                                    <div className="ml-20">
                                        <div>
                                            <label className="font-mono">Description</label>
                                            <textarea className="block h-[150px] w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3" placeholder="Enter your description" />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-5">
                                    <div className="flex justify-between ml-20">
                                        <button type="submit" className=" btn w-16 rounded font-medium text-white bg-blue-600 p-3 cursor-pointer hover:bg-orange-300">
                                            <span>Close</span>
                                        </button>
                                        <button type="submit" className=" btn w-14 rounded font-medium text-white bg-blue-600 p-3 cursor-pointer hover:bg-orange-300">
                                            <span>Add</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Add_stock