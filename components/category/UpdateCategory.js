import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useGetRequestProductByIdQuery,
  useUpdateRequestProductMutation,
} from "@/store/features/product/requestProductApi";
import { MdEditSquare } from "react-icons/md";
import axios from "axios";
import { useGetRequestCategoryByIdQuery, useUpdateRequestCategoryMutation } from "@/store/features/category/RequestCategoryApi";
export default function UpadteCategory({ id }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: categoryData, isLoading } = useGetRequestCategoryByIdQuery(id);
  const [idp, setIdp] = useState(0);
  useEffect(() => setIdp(id), []);
    const [updateCategory] = useUpdateRequestCategoryMutation();
    const handleUpdateCategory = async (id, category) => {
      try {
        const response = await updateCategory({ id, category });
        console.log(response.data)
        if (response.data) {
          // Successful response
          notify();
          setIsModalVisible(false);
        } else if (response.error) {
          // Error response
          notifyError();
        }
        // Handle success scenario
      } catch (error) {
        // Handle error scenario
      }
    };
  // success alert
  const notify = () => {
    toast.success("Category has been updated successfully!", {
      theme: "colored",
      icon: "🎉",
      autoClose: 1000,
      position: "top-center",
    });
  };
  const initialValues = {
    category: categoryData?.data?.category,
    description: categoryData?.data?.description,
  };

  //   const validationSchema = Yup.object({
  //     quantity: Yup.number()
  //       .positive()
  //       .integer()
  //       .required("Quantity is required"),
  //   });

  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>
        <div className="bg-yellow-400 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded">
          <MdEditSquare />
        </div>
      </button>

      {isModalVisible && (
        <div
          className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-50 flex justify-center items-center"
          onClick={() => setIsModalVisible(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg px-8 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Update Category</h3>
              <button
                type="button"
                className="text-teal-400 hover:text-teal-500 focus:outline-none"
                onClick={() => setIsModalVisible(false)}
              >
                <span className="sr-only">Close</span>
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <Formik
                initialValues={initialValues}
              //     validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  handleUpdateCategory(idp,values).then((resp) => {});
                }, 400);
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Category
                    </label>
                    <Field
                      type="text"
                      id="category"
                      name="category"
                      className="bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    />
                    {touched.category && errors.category && (
                      <div className="text-red-500">{errors.category}</div>
                    )}
                  </div>

                  <div>
                    <div>
                      <div>
                        <label className="block text-gray-700 font-bold mb-2">Description</label>

                        <Field
                          type="text"
                          as="textarea"
                          id="description"
                          name="description"
                          className={`block h-[100px] w-full rounded-md border-0 py-1.5  pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3${
                            touched.description && errors.description
                              ? "bg-red-100 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                              : "bg-gray-50 border border-purple-400 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                          }`}
                        />
                        {touched.description && errors.description && (
                          <div className="text-red-500">
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 my-4 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Save
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
    </>
  );
}
