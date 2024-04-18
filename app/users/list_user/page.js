"use client"
import React from "react";
import { MdEditSquare } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import { CiCircleCheck } from "react-icons/ci";

const Tableuser = () => {
    return (
        <div className="bg-white w-[134%] h-auto shadow-lg mt-4 ml-4">
            <div className="bg-sky-600 w-[100%] p-[15px]">
                <div className="ml-6  font-bold">
                    <div className="text-white ">list Users</div>
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="table-auto w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">No</th>
                            <th className="px-4 py-2">Profile</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Name Group</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Status</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">
                            <img src="#"
                                        alt="User"
                                        width={40}
                                        height={40}
                                    />
                            </td>
                            <td className="border px-4 py-2">Admin</td>
                            <td className="border px-4 py-2">Email</td>
                            <td className="border px-4 py-2">Sale</td>
                            <td className="border px-4 py-2">I Love You</td>
                            <td className="border px-4 py-2">
                                <div className="flex gap-1 justify-center">
                                    <button className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"><CiCircleCheck /></button>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div className="flex gap-1 justify-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><MdEditSquare /></button>
                                    <button className="bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"><MdDelete /></button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                        <td className="border px-4 py-2">1</td>
                            <td className="border px-4 py-2">
                            <img src="#"
                                        alt="User"
                                        width={40}
                                        height={40}
                                    />
                            </td>
                            <td className="border px-4 py-2">Admin</td>
                            <td className="border px-4 py-2">Email</td>
                            <td className="border px-4 py-2">Sale</td>
                            <td className="border px-4 py-2">I Love You</td>
                            <td className="border px-4 py-2">
                                <div className="flex gap-1 justify-center">
                                    <button className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded"><CiCircleCheck /></button>
                                </div>
                            </td>
                            <td className="border px-4 py-2">
                                <div className="flex gap-1 justify-center">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"><MdEditSquare /></button>
                                    <button className="bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"><MdDelete /></button>
                                </div>
                            </td>
                        </tr>
                        {/* Add more rows as needed */}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default Tableuser;