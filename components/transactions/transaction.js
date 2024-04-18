"use client"
import React from "react"

const Transaction = () => {
    return (
        <>
            <div className="container mt-3">
                <table className="table w-[100%]">
                    <thead className="p-[10px]">
                        <tr>
                            <th>Profile</th>
                            <th>Name Products</th>
                            <th>Order ID</th>
                            <th>Data</th>
                            <th>Customer name</th>
                            <th>Status</th>
                            <th>Amount</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="flex justify-center mt-2">
                                <div>
                                    <img src="/iphone xsmax.webp"
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </td>
                            <td className="text-center"> Iphone sx max</td>
                            <td className="text-center">#12345</td>
                            <td className="text-center">14.02.2024</td>
                            <td className="text-center">Lin Na</td>
                            <td className="text-center">
                                <span>cancelled</span>
                            </td>
                            <td className="text-center">$3.200</td>
                            <td className="text-center">.....</td>
                        </tr>
                        <tr>
                            <td className="flex justify-center mt-2">
                                <div>
                                    <img src="/iphone xsmax.webp"
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </td>
                            <td className="text-center"> Iphone sx max</td>
                            <td className="text-center">#12345</td>
                            <td className="text-center">14.02.2024</td>
                            <td className="text-center">Lin Na</td>
                            <td className="text-center">
                                <span>cancelled</span>
                            </td>
                            <td className="text-center">$3.200</td>
                            <td className="text-center">.....</td>
                        </tr>
                        <tr>
                            <td className="flex justify-center mt-2">
                                <div>
                                    <img src="/iphone xsmax.webp"
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </td>
                            <td className="text-center"> Iphone sx max</td>
                            <td className="text-center">#12345</td>
                            <td className="text-center">14.02.2024</td>
                            <td className="text-center">Lin Na</td>
                            <td className="text-center">
                                <span>cancelled</span>
                            </td>
                            <td className="text-center">$3.200</td>
                            <td className="text-center">.....</td>
                        </tr>
                        <tr>
                            <td className="flex justify-center mt-2">
                                <div>
                                    <img src="/iphone xsmax.webp"
                                        alt=""
                                        width={40}
                                        height={40}
                                    />
                                </div>
                            </td>
                            <td className="text-center"> Iphone sx max</td>
                            <td className="text-center">#12345</td>
                            <td className="text-center">14.02.2024</td>
                            <td className="text-center">Lin Na</td>
                            <td className="text-center">
                                <span>cancelled</span>
                            </td>
                            <td className="text-center">$3.200</td>
                            <td className="text-center">.....</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Transaction;