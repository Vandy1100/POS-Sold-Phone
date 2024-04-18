"use client";
import React, { useContext, useEffect } from "react";
import MainHeader from "./MainHeader";
import { MdDashboard } from "react-icons/md";
import Link from "next/link";
import { MdNavigateNext } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { SiProtondrive } from "react-icons/si";
import { RiFolderTransferFill } from "react-icons/ri";
import { BiSolidReport } from "react-icons/bi";
import { MenuContext } from "@/context/MenuContext";
import { IoLogOut } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Login from "@/app/auth/login/page";
import { logout } from "@/store/features/auth/authSlice";
const MainLayout = ({ children }) => {
  const { open } = useContext(MenuContext);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

 

  const [isDropdownOpenProduct, setIsDropdownOpenProduct] = useState(false);

  const handleDropdownToggleProduct = () => {
    setIsDropdownOpenProduct(!isDropdownOpenProduct);
  };
  const dispatch = useDispatch();
  const router = useRouter()
  //set logout
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("isLoggedIn");
    router.push("/auth/login")
    // Perform any additional logout logic, such as redirecting or clearing local storage
  };
  const pathname = usePathname()
  if(pathname ==="/auth/login"){
    return <Login></Login>;
  }
  return (
    <div className="bg-gray-100 w-screen min-h-screen">
      <MainHeader />
      <div className="flex justify-start items-start">
        {/* <aside className='bg-white rounded-lg w-56 h-[100vh] p-4'> */}
        <aside
          className={`bg-white h-[100vh] overflow-hidden transition-all duration-100 ${open ? "w-56 p-0" : "w-0"
            } lg:w-56 lg:p-4`}
        >
          <ul>
            <li className="flex items-center gap-[15px] mt-3 cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <MdDashboard className="mr-2" />
              <Link className=" font-extrabold" href="/">
                Dashboard
              </Link>
            </li>
            <li
              className="flex items-center gap-[15px] mt-3 cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2"
              onClick={handleDropdownToggle}
            >
              <FaUser className="mr-2" />
              <span className="font-normal flex-1">Users</span>
              <MdNavigateNext />


            </li>
            {/* Dropdown */}
            {isDropdownOpen && (
              <ul className=" z-10 top-full left-0 mt-1 ms-4 w-36">
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/users/create_group_user">Add Group User</Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/users/list_group_user">List Group User</Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/users/create_user">Create User</Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/users/list_user">List User</Link>
                </li>
              </ul>
            )}
            <li
              className="flex items-center gap-[15px] mt-3 cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2"
              onClick={handleDropdownToggleProduct}
            >
              <SiProtondrive className="mr-2" />
              <span className="font-normal flex-1">Products</span>
              <MdNavigateNext />


            </li>
            {/* Dropdown */}
            {isDropdownOpenProduct && (
              <ul className=" z-10 top-full left-0 mt-1 ms-4 w-36">
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/product/create_product">Add Product</Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/product/index_product">List Products</Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/product/create_category">List Category</Link>
                </li>
                <li className="py-2 px-4 hover:bg-gray-100">
                  <Link href="/product/stock_history">Stock History</Link>
                </li>
              </ul>
            )}

            <li className="flex items-center gap-[15px] mt-3 cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <RiFolderTransferFill className="mr-2" />
              <Link className=" font-normal flex-1" href="/sales">
                Sale
              </Link>
            </li>
            <li className="flex items-center gap-[15px] mt-3 cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <BiSolidReport className="mr-2" />
              <Link className=" font-normal flex-1" href="#">
                Reports
              </Link>
              <MdNavigateNext />
            </li>
            <li className="flex items-center gap-[15px] mt-3 cursor-pointer hover:bg-blue-200 hover:text-blue-800 rounded-xl p-2">
              <IoLogOut className="mr-2" />
              <div onClick={handleLogout}  className=" font-normal flex-1">
                Log Out
              </div>
            </li>
          </ul>
        </aside>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;
