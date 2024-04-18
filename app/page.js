"use client"
import Card from '@/components/card/card'
import { useGetRequestProductsQuery } from '@/store/features/product/requestProductApi'
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useGetUserQuery } from '@/store/features/user/userApiSlice';
import { selectIsLoggedIn, setCurrentUser } from '@/store/features/auth/authSlice';
import Login from './auth/login/page';

const page = () => {
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  const data = useSelector((state) => state);
  console.log("accessToken",data)
  console.log("user", user);
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
    console.log("+",storedLoggedIn)
    if (!isLoggedIn && !storedLoggedIn) {
      // Redirect to the login page if the user is not logged in
      console.log("User not logged in. Please log in to perform this action.");
      router.push("/auth/login"); // Update to the actual login page route
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("isLoggedIn", "true");
    } else {
      localStorage.setItem("isLoggedIn","false");
    }
  }, [isLoggedIn]);
  if (role && role.some((r) => r?.role === "CREATOR")) {
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
    
  
  }


}

export default page