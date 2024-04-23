import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { useCreateRequestCategoryMutation } from "@/store/features/category/RequestCategoryApi";
export default function AddCategory() {
  const [isModalVisible, setIsModalVisible] = useState(false);

    // success alert
    const notify = () => {
        toast.success("Category has been created successfully!", {
          theme: "colored",
          icon: "🎉",
          autoClose: 1000,
          position: "top-center",
        });
      };
    
      const [insertCategory] = useCreateRequestCategoryMutation();
      const postCategory = async (values) => {
        try {
          insertCategory(values);
          notify();
          setIsModalVisible(false);
        } catch (error) {
          alert(error.message);
        }
      };
      
      const initialValues = {
        category: "",
        description: "",
      };
      const validationSchema = Yup.object().shape({
        category: Yup.string().required("Category is required"),
      });


  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <IoIosAddCircle />
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
              <h3 className="text-xl font-semibold text-gray-900">Create Category</h3>
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
                onSubmit={(values, { setSubmitting, resetForm }) => {
                //   values.userId = id;

                  setTimeout(() => {
  
                    setSubmitting(false);
                    postCategory(values).then((resp) => {
                        resetForm({
                            values:{
                                category:"",
                                description:""
                            }
                        })
                    });
                  }, 400);
                }}
                validationSchema={validationSchema} 
              >
                {({ errors, touched }) => (
                  <Form>
                    <div >
                      <div>
                        <div>
                          <label className="font-semibold">Name Category</label>
                          <Field
                            type="text"
                            name="category"
                            id="category"
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3 ${
                                touched.category && errors.category
                                  ? "bg-red-100 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                                  : "bg-gray-50 border border-purple-400 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                              }`}
                            placeholder="Name Category....?"
                          />
                           {touched.category && errors.category && (
                       <div className="text-red-500">{errors.category}</div>
                    )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <div >
                        <div>
                          <label className="font-semibold">Description</label>
            
                          <Field
                      type="text"
                      as="textarea"
                      id="description"
                      name="description"
                      className={`block h-[100px] w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3${
                        touched.description && errors.description
                          ? "bg-red-100 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                          : "bg-gray-50 border border-purple-400 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                      }`}
                    />
                    {touched.description && errors.description && (
                      <div className="text-red-500">{errors.description}</div>
                    )}
              

                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className=" btn w-14 rounded font-medium text-white bg-blue-600 p-3 cursor-pointer hover:bg-orange-300"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>



          </div>
        </div>
      )}
    </>
  );
}
