import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { useCreateRequestCategoryMutation } from "@/store/features/category/RequestCategoryApi";
import { useCreateRequestAccessoryMutation } from "@/store/features/accessory/RequestAccessoryApi";
import axios from "axios";
export default function AddAccessory({ id }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [ida, setIdp] = useState(0);
  useEffect(() => {
    setIdp(id);
  }, [id]);
  // success alert
  const notify = () => {
    toast.success("Category has been created successfully!", {
      theme: "colored",
      icon: "🎉",
      autoClose: 1000,
      position: "top-center",
    });
  };

  console.log(id);

  const initialValues = {
    productId: ida,
    accessory: "",
    file: "",
    description: "",
  };

  const uploadImage = async (values) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/files",
        values.file
      );
      return response.data.data.fileName;
    } catch (error) {}
  };
  const [insertAccessory] = useCreateRequestAccessoryMutation();
  const postAccessory = async (values) => {
    try {
      let { productId, accessory, image, description } = values;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const userData = JSON.stringify({
        productId,
        accessory,
        image,
        description,
      });
      console.log(userData);
      const res = await insertAccessory(userData);
      
      notify();
      setIsModalVisible(false);
    } catch (error) {
      alert(error.message);
    }
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
            className="bg-white w-1/3 rounded-lg shadow-lg px-8 py-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                Create Category
              </h3>
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
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const formData = new FormData();
                formData.append("file", values.file);
                const image = await uploadImage({ file: formData });
                values.image = image;
                // values.productId = idp;
                setTimeout(() => {
                  //  alert(JSON.stringify(values, null, 2));

                  setSubmitting(false);
                  postAccessory(values).then((resp) => {
                    resetForm({
                      values: {
                        accessory: "",
                        description: "",
                      },
                    });
                  });
                }, 400);
              }}
              // validationSchema={validationSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <div>
                      <div>
                        <label className="font-semibold">Accessory</label>
                        <Field
                          type="text"
                          name="accessory"
                          id="accessory"
                          className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3 ${
                            touched.category && errors.category
                              ? "bg-red-100 border border-red-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-red-500 dark:focus:border-red-500"
                              : "bg-gray-50 border border-purple-400 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                          }`}
                          placeholder="Name Accessory....?"
                        />
                        {touched.accessory && errors.accessory && (
                          <div className="text-red-500">{errors.accessory}</div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div>
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
                          <div className="text-red-500">
                            {errors.description}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-12 mt-5 ml-3">
                    <div className="flex gap-6">
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
