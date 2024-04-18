import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useCreateRequestAddStockProductMutation } from "@/store/features/product/requestProductApi";

export default function AddStockProduct({ id }) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [addStockProduct, { isLoading: isUpdating, error: updateError }]= useCreateRequestAddStockProductMutation()

  const handleUpdate = async (values) => {
    try {
      let { productId,quantity } = values;
      let myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      const userData = JSON.stringify({
        productId,
        stockDto: {
          quantity,
        },
      });
      const response = await addStockProduct(userData);
      if (response.data) {
        // Successful response
        notify();
        setIsModalVisible(false);
      } else if (response.error) {
        // Error response
        notifyError();
      }
    } catch (error) {}
  };
  // success alert
  const notify = () => {
    toast.success("Stock has been added successfully!", {
      theme: "colored",
      icon: "🎉",
      autoClose: 1000,
      position: "top-center",
    });
  };

  const initialValues = {
    productId:"",
    quantity: "",
  };

  const validationSchema = Yup.object({
    quantity: Yup.number()
      .positive()
      .integer()
      .required("Quantity is required"),
  });

  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <MdOutlineAddShoppingCart />
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
              <h3 className="text-xl font-semibold text-gray-900">Add Stock</h3>
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
              validationSchema={validationSchema}
              onSubmit={(values, { setSubmitting, resetForm }) => {
                 values.productId=id

                  setTimeout(() => {
                    setSubmitting(false);
                    handleUpdate(values).then((resp) => {});
                  }, 400);
                }}

            >
              {({ errors, touched }) => (
                <Form>
                  <div className="mb-4">
                    <label
                      htmlFor="stock"
                      className="block text-gray-700 font-bold mb-2"
                    >
                      Quantity
                    </label>
                    <Field
                      type="number"
                      id="quantity"
                      name="quantity"
                      className="bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    />
                     {touched.quantity && errors.quantity && (
                      <div className="text-red-500">{errors.quantity}</div>
                    )}
                  </div>

                  <button
                    type="submit"
                    className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
