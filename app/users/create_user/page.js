"use client";
import React from "react";
import { IoMdAddCircle } from "react-icons/io";
import { Checkbox } from "@nextui-org/react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCreateRequestUserMutation, useGetRequestRolesQuery } from "@/store/features/auth/authApiSlice";
const User = () => {

    const notify = () => {
        toast.success("User has been created successfully!", {
          theme: "colored",
          icon: "🚀",
          autoClose: 1000,
          position: "top-center",
        });
      };
      // error alert
      const notifyError = () => {
        toast.error("Can not insert user!", {
          theme: "colored",
          autoClose: 1000,
          icon: "🚀",
          position: "top-center",
        });
      };

    const initialValues = {
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
        role:0
      };
      const validationSchema = Yup.object({
        firstname: Yup.string().required("First name is required"),
        lastname: Yup.string().required("Last name is required"),
        email: Yup.string().email("Invalid email address").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
          role:Yup.number().positive().integer().required('Please select a role')
      });

      const [createUser] = useCreateRequestUserMutation()

      const postUser = async (values) => {
        try {
          let { email, password, confirmPassword, firstname, lastname,role} = values;
          let myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
    
          const userData = JSON.stringify({
            email, password, confirmPassword, firstname, lastname,role
          });
          alert(userData);
          const response = await createUser(userData);
          console.log(response)
          if (response.data) {
            // Successful response
            notify();
          } else if (response.error) {
            // Error response
            notifyError();
          }
        } catch (error) {
          notifyError()
        }
      };

      const {data:roles,isLoading:roleIsLoading,error,roleError}= useGetRequestRolesQuery()
      console.log("role",roles)

  return (
    <>
      <div>
        <div className="container mt-6 ml-10">
          <div className="bg-white h-auto w-[720px] shadow-lg">
            <div className="bg-sky-600 w-[100%] p-[15px] ">
              <div className="ml-6  font-bold">
                <div className="text-white ">Create Users</div>
              </div>
            </div>
            <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    postUser(values).then((resp) => {
                      resetForm({
                          values:{
                              email:"",
                              password:"",
                              confirmPassword:"",
                              firstname:"",
                              lastname:"",
                              role:0
                          }
                      })
                    });
                  }, 400);
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
 
            <div class ="max-w-md  mt-10 mx-auto">
              <div class="relative z-0 w-full mb-5 group">
                <Field
                  type="email"
                  name="email"
                  id="email"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="email"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Email address
                </label>
                {touched.email && errors.email && (
                            <small className="text-red-500">{errors.email}</small>
                          )}
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <Field
                  type="password"
                  name="password"
                  id="password"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="password"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Password
                </label>
                {touched.password && errors.password && (
                            <small className="text-red-500">{errors.password}</small>
                          )}
              </div>
              <div class="relative z-0 w-full mb-5 group">
                <Field
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                  placeholder=" "
                />
                <label
                  for="confirmPassword"
                  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                >
                  Confirm password
                </label>
                {touched.confirmPassword && errors.confirmPassword && (
                            <small className="text-red-500">{errors.confirmPassword}</small>
                          )}
              </div>
              <div class="grid md:grid-cols-2 md:gap-6">
                <div class="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="firstname"
                    id="firstname"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "
                  />
                  <label
                    for="firstname"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    First name
                  </label>
                  {touched.firstname && errors.firstname && (
                            <small className="text-red-500">{errors.firstname}</small>
                          )}
                </div>
                <div class="relative z-0 w-full mb-5 group">
                  <Field
                    type="text"
                    name="lastname"
                    id="lastname"
                    class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    placeholder=" "

                  />
                  <label
                    for="lastname"
                    class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                  >
                    Last name
                  </label>
                  {touched.lastname && errors.lastname && (
                            <small className="text-red-500">{errors.lastname}</small>
                          )}
                </div>
                <div class="relative z-0 w-full mb-5 group">
    <Field
        as="select"
        name="role"
        id="role"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
    >
        <option selected>Select Role</option>

           {roles?.data
            ? roles?.data?.map((item,index) => (
                <option key={index} value={item.id}>
                  {item.role}
                </option>
              ))
            : null}
     
    </Field>
    <label
        for="role"
        class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
    >
        Role
    </label>
    {touched.role && errors.role && (
        <small className="text-red-500">{errors.role}</small>
    )}
</div>

              </div>
              
              <button
                type="submit"
                class="text-white mb-10 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Submit
              </button>
            </div>
            </Form>
                )}
            </Formik>
          </div>
          
        </div>
        
      </div>
      <ToastContainer/>
    </>
  );
};

export default User;
