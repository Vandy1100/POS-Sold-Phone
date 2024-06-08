
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
export default function UpadteProduct({ id }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { data: productData, isLoading } = useGetRequestProductByIdQuery(id);
  const [updateProduct] = useUpdateRequestProductMutation();
  const [idp, setIdp] = useState(0);
  useEffect(() => setIdp(id), [id]);
  const handleUpdateProduct = async (id, product) => {
    try {

      const response = await updateProduct({ id, product });
      console.log("hik",response)
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
    toast.success("Product has been updated successfully!", {
      theme: "colored",
      icon: "🎉",
      autoClose: 1000,
      position: "top-center",
    });
  };

  const initialValues = {
    name: productData?.data?.name,
    file: productData?.data?.productImage,
    price: productData?.data?.price,
  };

  const uploadImage = async (values) => {
    try {
      const response = await axios.post(
        process.env.NEXT_PUBLIC_BASE_URL + "/files",
        values.file
      );
      return response.data;
    } catch (error) {
    }
  };

  //   const validationSchema = Yup.object({
  //     quantity: Yup.number()
  //       .positive()
  //       .integer()
  //       .required("Quantity is required"),
  //   });

  return (
    <>

      <button  onClick={() => setIsModalVisible(true)} class="bg-yellow-200 hover:bg-yellow-300 text-white px-4 py-2 rounded">
              Edit
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
              <h3 className="text-xl font-semibold text-gray-900">Update Product</h3>
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
              //   validationSchema={validationSchema}
              onSubmit={async (values, { setSubmitting, resetForm }) => {
                const formData = new FormData();
                formData.append("file", values.file);
                const image = await uploadImage({ file: formData });
                if(image && image.code == 200){
                    values.productImage=image?.data?.fileName

                }else{
                    values.productImage=productData?.data?.filename

                }

                setTimeout(() => {

                  setSubmitting(false);
                  handleUpdateProduct(idp, values).then((resp) => {});
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
                      Name
                    </label>
                    <Field
                      type="text"
                      id="name"
                      name="name"
                      className="bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    />
                    {touched.name && errors.name && (
                      <div className="text-red-500">{errors.name}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="subject"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Price
                    </label>
                    <Field
                      type="number"
                      id="price"
                      name="price"
                      className="bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    />
                    {touched.price && errors.price && (
                      <div className="text-red-500">{errors.price}</div>
                    )}
                  </div>
                  <div className="mb-4">
                    <label
                      for="dropzone-file"
                      class="flex flex-col items-center relative justify-center w-96 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center justify-center pt-5 pb-6">
                        <img
                          className="w-64 h-64"
                          src={productData?.data?.productImage}
                          alt="Uploaded File Preview"
                        />
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
                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update
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
