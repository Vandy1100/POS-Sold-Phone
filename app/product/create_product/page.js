"use client";
import React, { useEffect, useState } from "react";
import { useGetRequestCategoriesQuery } from "@/store/features/category/RequestCategoryApi";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useCreateRequestProductMutation } from "@/store/features/product/requestProductApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Create = () => {

    const notify = () => {
        toast.success("Product has been added successfully!", {
          theme: "colored",
          icon: "🚀",
          autoClose: 1000,
          position: "top-center",
        });
      };
      // error alert
      const notifyError = () => {
        toast.error("Can not insert Product!", {
          theme: "colored",
          autoClose: 1000,
          icon: "🚀",
          position: "top-center",
        });
      };
  const { data: category, isLoading, error } = useGetRequestCategoriesQuery();

  const initialValues = {
    name: "",
    categoryId: "",
    price: "",
    file: "",
    quantity: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    quantity: Yup.string().required("Quantity is required"),
    price: Yup.string().required("Price is required"),
    categoryId:Yup.number().positive().integer().required("Category is required"),
  });

  const uploadImage = async (values) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/files",
        values.file
      );
      return response.data.data.fileName;
    } catch (error) {
    }
  };
  const [insertProduct]=useCreateRequestProductMutation()

  const postProduct = async (values) => {
    try {
      let { name, categoryId, price, productImage, quantity } = values;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const userData = JSON.stringify({
        productDto: { name, categoryId, price, productImage },
        stockDto: {
          quantity,
        },
      });
      const response = await insertProduct(userData);
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

  return (
    <>
      <div>
        <div className="container mt-6 ml-10">
          <div className="bg-white w-[90%] h-auto shadow-lg">
            <div className="bg-sky-600 w-[100%] p-[15px] ">
              <div className="ml-6  font-bold">
                <div className="text-white ">Create Product</div>
              </div>
            </div>
            <div className="p-10">
              <Formik
                initialValues={initialValues}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  const formData = new FormData();
                  formData.append("file", values.file);
                  const image = await uploadImage({ file: formData });
                  values.productImage = image;
                  setTimeout(() => {
                    // alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                    postProduct(values).then((resp) => {
                      resetForm({
                          values:{
                              name:"",
                              file:null,
                              price:"",
                              quantity:"",
                              categoryId:0
                          }
                      })
                    });
                  }, 400);
                }}
                validationSchema={validationSchema}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="grid grid-cols-12 mt-5 ml-3">
                      <div className="flex gap-6 ml-20">
                        <div>
                          <label className="font-mono">Product Name</label>
                          <Field
                            type="text"
                            name="name"
                            id="name"
                            maxLength="30"
                            class=" block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                            placeholder="Product Name....?"
                          />
                          {touched.name && errors.name && (
                            <div className="text-red-500">{errors.name}</div>
                          )}
                        </div>
                        <div>
                          <label className="font-mono">Category</label>
                          <Field
                            id="categoryId"
                            name="categoryId"
                            as="select"
                            class="block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                          >
                            <option selected>Choose Category</option>
                            {category?.data
                              ? category?.data.map((item) => (
                                  <option key={item.id} value={item.id}>
                                    {item.category}
                                  </option>
                                ))
                              : null}
                          </Field>{" "}
                          {touched.categoryId && errors.categoryId && (
                            <div className="text-red-500">Category is required</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 mt-5 ml-3">
                      <div className="flex gap-6 ml-20">
                        <div>
                          <label className="font-mono">QTY</label>
                          <Field
                            type="text"
                            name="quantity"
                            id="quantity"
                            class=" block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                            placeholder="Quantity....?"
                          />
                          {touched.quantity && errors.quantity && (
                            <div className="text-red-500">
                              {errors.quantity}
                            </div>
                          )}
                        </div>
                        <div>
                          <label className="font-mono">Price</label>
                          <Field
                            type="text"
                            name="price"
                            id="price"
                            class=" block w-96 rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                            placeholder="Price....?"
                          />
                          {touched.price && errors.price && (
                            <div className="text-red-500">{errors.price}</div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 mt-5 ml-3">
                      <div className="flex gap-6 ml-20">
                        <div>
                          <label
                            for="dropzone-file"
                            class="flex flex-col items-center relative justify-center w-96 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                          >
                            <div class="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                aria-hidden="true"
                                class="w-10 h-10 mb-3 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  stroke-width="2"
                                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                ></path>
                              </svg>
                              <div class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <p class="font-semibold">Click to upload</p> or
                                drag and drop
                              </div>
                              <p class="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <Field
                              id="dropzone-file"
                              name="file"
                              type="file"
                              className="hidden"
                              component={DropFileZone}
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="mt-5">
                      <div className="flex justify-between ml-20">
                        <button
                          type="submit"
                          className=" btn w-14 rounded font-medium text-white bg-blue-600 p-3 cursor-pointer hover:bg-orange-300"
                        >
                          <span>Add</span>
                        </button>
                      </div>
                    </div>
                    <ToastContainer />
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
function DropFileZone({ field, form }) {
  const [previewImage, setPreviewImage] = useState(null);
  useEffect(() => {
    // Reset previewImage to null after form submission
    if (form.submitCount > 0) {
      setPreviewImage(null);
    }
  }, [form.submitCount]);
  const handleChange = (event) => {
    const file = event.currentTarget.files[0];
    form.setFieldValue(field.name, file);
    setPreviewImage(URL.createObjectURL(file));
  };
  return (
    <>
      <input
        id="dropzone-file"
        type="file"
        name="image"
        onChange={handleChange}
        className="hidden"
      />
      {previewImage && (
        <img
          src={previewImage}
          alt="preview"
          className="mt-0 h-full rounded-sm absolute w-full"
        />
      )}
    </>
  );
}

export default Create;
