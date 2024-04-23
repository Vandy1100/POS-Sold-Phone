import { Field, Form, Formik, useFormikContext } from "formik";
import React, { useEffect, useState } from "react";
import { MdOutlineDiscount } from "react-icons/md";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { useUpdateRequestDiscountMutation } from "@/store/features/product/requestProductApi";
export default function AddDiscount({ id }) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [idp, setIdp] = useState(0);
  useEffect(() => setIdp(id), []);
  const initialValues = {
    discount: "",
    endDiscountTime: "",
  };
  const validationSchema = Yup.object({
    discount: Yup.number()
      .positive()
      .integer()
      .required("Discount is required"),
      endDiscountTime: Yup.number()
      .positive()
      .required('End discount time is required'),
  });

  const notify = () => {
    toast.success("Discount has been created successfully!", {
      theme: "colored",
      icon: "🎉",
      autoClose: 1000,
      position: "top-center",
    });
  };
  

  const notifyError = () => {
    toast.success("You not set your discount!!", {
      theme: "colored",
      icon: "🚀",
      autoClose: 1000,
      position: "top-center",
      style: {
        background: "red",
      },
    });
  };

  const [UpdateDiscount, { isLoading: isUpdating, error: updateError }] =
    useUpdateRequestDiscountMutation();

  const handleUpdateDiscount = async (id, discount) => {
    try {
      const response = await UpdateDiscount({ id, discount });
      if (response?.data?.code == "200") {
        notify();
        setIsModalVisible(false);
      } else  {
        notifyError();
      }
      // Handle success scenario
    } catch (error) {
      // Handle error scenario
    }
  };

  return (
    <>
      <button onClick={() => setIsModalVisible(true)}>
        <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <MdOutlineDiscount />
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
              <h3 className="text-xl font-semibold text-gray-900">Create Discount</h3>
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
                setTimeout(() => {
                  // alert(JSON.stringify(values, null, 2));
                  setSubmitting(false);
                  handleUpdateDiscount(idp, values).then((resp) => {});
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
                      {`Discount(%)`}
                    </label>
                    <Field
                      type="number"
                      id="discount"
                      name="discount"
                      className="bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
                    />
                    {touched.discount && errors.discount && (
                      <div className="text-red-500">{errors.discount}</div>
                    )}
                  </div>

                  <div className="mb-4">
                    <DiscountDatePicker name="endDiscountTime" />
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
            <ToastContainer/>
          </div>
        </div>
      )}
    </>
  );
}

const DiscountDatePicker = ({ name }) => {
  const { setFieldValue, values, touched, errors } = useFormikContext();
  const [selectedDate, setSelectedDate] = useState(null);

  const calculateDifferenceInSeconds = (futureDate) => {
    const currentTime = new Date();
    const futureTime = new Date(futureDate);
    const differenceInSeconds =
      (futureTime.getTime() - currentTime.getTime()) / 1000;
    return Math.floor(differenceInSeconds);
  };

  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-gray-700 font-bold mb-2">
        End Discount Time
      </label>
      <DatePicker
        id={name}
        name={name}
        selected={selectedDate}
        onChange={(date) => {
          setSelectedDate(date);
          const seconds = calculateDifferenceInSeconds(date);
          setFieldValue(name, seconds);
        }}
        className="bg-gray-50 border border-teal-300 text-gray-900 text-sm rounded-lg focus:ring-teal-500 focus:border-teal-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-teal-500 dark:focus:border-teal-500"
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      {touched[name] && errors[name] && (
        <div className="text-red-500">{errors[name]}</div>
      )}
    </div>
  );
};
