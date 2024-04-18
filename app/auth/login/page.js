"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { setCredentials } from "../../../store/features/auth/authSlice";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoginMutation } from "@/store/features/auth/authApiSlice";


const Login = () => {

// least 6 characters long, contains at least one uppercase letter, one lowercase letter, and one number
const passwordRegex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6,}$/;
// ^ start at the beginning of the string
// (?=.*?[A-Z]) contain at least one uppercase letter
// (?=.*?[a-z]) contain at least one lowercase letter
// (?=.*?[0-9]) contain at least one number
// .{6,} are at least 6 characters long
// $ end at the end of the string

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must be at least 6 characters, a number, an Uppercase, and a Lowercase"
    ),
});

const notifyError = () => {
    toast.success("Incorrect gmail or password!!", {
      theme: "colored",
      icon: "🚀",
      autoClose: 1000,
      position: "top-center",
      style: {
        background: "red",
      },
    });
  };
  const notify = () => {
    toast.success("You has been login successfully!!", {
      theme: "colored",
      icon: "🚀",
      autoClose: 1000,
      position: "top-center",
    });
  };

const router = useRouter();
const dispatch = useDispatch();
const [login, { isLoading }] = useLoginMutation()

const handleSubmit = async ({ email, password }) => {
    try {
      // .unwrap() is a utility function that will return either the fulfilled value or throw the rejected value as an error.
      const { data } = await login({ email, password }).unwrap();
        console.log("data", data);
      dispatch(
        setCredentials(data)
      );
      notify()
      router.push("/");
    } catch (error) {
      if (!error.response) {
        notifyError()
        console.log(error)
      } else if (error.response.status === 400) {
        alert("Missing email or password");
      } else if (error.response.status === 403) {
        alert("Forbidden - You don't have permission to access this resource");
      }
    }
  };


  if (isLoading)
  return (
    <div
      className="fixed top-0 left-0 flex justify-center items-center w-full h-full bg-gray-200 bg-opacity-75 z-50"
    >
      <div
        className="animate-spin w-16 h-16 border-[3px] border-current border-t-transparent text-purple-600 rounded-full"
        role="status"
        aria-label="loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
      <ToastContainer />
    </div>
  );
  
    return (
        <div className='border border-gray-800 h-[100vh] w-[100vw]'>
        <div className=" bg-[url('https://content3.jdmagicbox.com/comp/ernakulam/c5/0484px484.x484.131004102709.k9c5/catalogue/smart-mobile-shop-kakkanad-ernakulam-mobile-phone-dealers-sony-a0996vg6mz.jpg')] bg-cover h-[100vh]   p-0 m-0">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting, resetForm }) => {
              setTimeout(() => {
                handleSubmit(values);
                resetForm();
              }, 500);
            }}
          >
            {({ isSubmitting }) => (
              <Form className="flex justify-center">
                {/* Email */}
                <div className="container flex justify-center mt-[10%]">
                    <div className="backdrop-blur-sm rounded-xl bg-white/50 p-5 w-[30%] align-top top-7 justify-center">
                        <div className="flex justify-center">
                             <img src="https://www.pngall.com/wp-content/uploads/5/Profile-Male-PNG.png"
                              height={85}
                              width={85}
                            />
                        </div>
                  <Field
                    type="email"
                    name="email"
                    id="floating_email"
                    className="block w-[100%] rounded-2xl backdrop-blur-sm bg-white/30 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                    placeholder=" "
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500"
                  />
                  <Field
                    autoComplete="off"
                    type="password"
                    name="password"
                    id="floating_password"
                    className="rounded-2xl block w-[100%] backdrop-blur-sm bg-white/30 border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset bg-none2  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                    placeholder=" "
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500"
                  />
                     <div className="flex gap-3">
                       <input type="checkbox" className="cursor-pointer mt-1 rounded-xl" />
                        <span>Remunber</span>
                   </div>
                    <button disabled={isSubmitting}
                    type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</button>
                </div>
                  
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <ToastContainer />
        </div>
      );
    



    
   }

export default Login