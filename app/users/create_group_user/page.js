"use client"
import React from 'react'
import { IoMdAddCircle } from "react-icons/io";

const Groupuser = () => {
    return (
        <>
            <div>
                <div className="container mt-6 ml-10">
                    <div className="bg-white w-[199%] h-auto shadow-lg">
                        <div className="bg-sky-600 w-[100%] p-[15px] ">
                            <div className="ml-6  font-bold">
                                <div className="text-white ">Create Group Users</div>
                            </div>
                        </div>
                        <div className="p-10">
                            <div className="mt-5 ml-3">
                                <div className="ml-20">
                                    <div>
                                        <label className="font-mono">Name Group</label>
                                        <input className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3" placeholder="Enter your Group Name" />
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Groupuser