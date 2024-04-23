"use client"
import Card from '@/components/card/card'
import { useGetRequestProductsQuery } from '@/store/features/product/requestProductApi'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from '@/store/features/user/userApiSlice';
import { logout, selectIsLoggedIn, setCurrentUser } from '@/store/features/auth/authSlice';
import Login from './auth/login/page';
import CardCreator from '@/components/card/cardCreator';
import Add_sale from './sales/add_sale/add_sale';
import Calu_sale from './sales/add_sale/calu_sale';

const page = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  const data = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser(user));
    }
  }, []);
  const role= user?.data?.roles

  //set session user is not logged in
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const router = useRouter();
  console.log(isLoggedIn)
  useEffect(() => {
    const storedLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn && !storedLoggedIn) {
      // Redirect to the login page if the user is not logged in
      console.log("User not logged in. Please log in to perform this action.");
      dispatch(logout());
      router.push("/auth/login"); // Update to the actual login page route
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.setItem("isLoggedIn","false");
    }
  }, [isLoggedIn]);
  if (role && role.some((r) => r?.role === "ADMIN")) {
    return (
      <div>
        <div className="container ml-2 mt-3">
          <div className="font-bold">
            Dashboard
          </div>
          <Card />
        </div>
      </div>
    )
  }else {
    return(
      <div>
      <div className="flex gap-3 mt-2">
          <div>
              <div className="mt-1 ml-1">
                  <Add_sale />
              </div>
          </div>
          <div >
              <div className="ml-2 mt-2 ">
                 <Calu_sale />
              </div>
          </div>
      </div>
  </div>
  )}



}

export default page