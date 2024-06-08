import {
  decrementQuantity,
  incrementQuantity,
  removeAllCart,
  removeFromCart,
  selectCartItems,
  selectFinalPrice,
  selectItemOfOne,
  selectTotalDiscount,
  selectTotalPrice,
} from "@/store/features/cart/cartSlice";
import { useGetRequestProductsQuery } from "@/store/features/product/requestProductApi";
import { useCreateRequestSoldItemMutation } from "@/store/features/soldItem/RequestSoldItemApi";
import {
  Field,
  Form,
  Formik,
  useFormikContext,
  validateYupSchema,
} from "formik";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoice from "./invoice";
import * as Yup from "yup";
import { IoIosAddCircle, IoMdEye } from "react-icons/io";
import { useGetUserQuery } from "@/store/features/user/userApiSlice";
import { setCurrentUser } from "@/store/features/auth/authSlice";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
const Calu_sale = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalDiscount = useSelector(selectTotalDiscount);
  const finalPrice = useSelector(selectFinalPrice);
  const ItemOfOne = useSelector(selectItemOfOne);

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [products, setProduct] = useState([]);
  const [code, setCode] = useState("");
  const [id, setId] = useState(0);
  const dispatch = useDispatch();
  const {
    data: user,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUserQuery();
  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrentUser(user));
    }
  }, []);
  useEffect(() => {
    setId(user?.data?.id);
    [];
  });
  // const [price,setPrice] = useState([])
  // const [quantity, setQuantity] = useState(0); // Initial quantity
  const increment = (id) => {
    dispatch(incrementQuantity({ id }));
  };

  const decrement = (id) => {
    dispatch(decrementQuantity({ id }));
  };

  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetRequestProductsQuery();

  const removeCart = (id) => {
    const selectedProduct = product?.data.find((p) => p.id === id);
    if (selectedProduct) {
      const { id } = selectedProduct;
      const productToRemove = { id };
      dispatch(removeFromCart(productToRemove));
    }
  };

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    totalAmount: 0,
    productId: [],
    quantity: [],
    unitPrice: [],
    userId: [],
    IME: [],
    warrantyDate: [],
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Address is required"),
    phone: Yup.string().required("Phone number is required"),
    IME: Yup.array()
      .of(Yup.string().required("IME is required"))
      .test({
        name: "at-least-one-ime",
        message:
          "IME is required",
        test: (value) => {
          if (!value || value.length === 0) {
            return false; // if the array is empty, it's invalid
          }
          return value.every((ime) => ime !== undefined && ime !== ""); // check each IME
        },
      }),
  });

  cartItems.forEach((item) => {
    initialValues.productId.push(item.id);
    initialValues.quantity.push(item.quantity);
    initialValues.unitPrice.push(item.itemOfOne);
    initialValues.userId.push(""); // Assuming userId is a string
  });

  const notify = () => {
    toast.success("Sold Item has been created successfully!", {
      theme: "colored",
      icon: "🎉",
      autoClose: 1000,
      position: "top-center",
    });
  };

  const notifyError = () => {
    toast.success("You not sold your item!!", {
      theme: "colored",
      icon: "🚀",
      autoClose: 1000,
      position: "top-center",
      style: {
        background: "red",
      },
    });
  };
  const insufficientError = () => {
    toast.success("Insufficient stock available for product!!", {
      theme: "colored",
      icon: "🚀",
      autoClose: 1000,
      position: "top-center",
      style: {
        background: "red",
      },
    });
  };

  useEffect(() => {
    setProduct(cartItems);
  }, [cartItems]);

  const [createSoldItem] = useCreateRequestSoldItemMutation();

  const postSaleItem = async (values) => {
    try {
      const {
        name,
        email,
        phone,
        totalAmount,
        productId,
        quantity,
        unitPrice,
        userId,
        IME,
        warrantyDate,
      } = values;

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const customerDto = { name, email, phone };
      const saleDto = { totalAmount };
      const saleItemDtos = productId.map((id, index) => ({
        productId: id,
        quantity: quantity[index],
        unitPrice: unitPrice[index],
        userId: userId[index],
      }));
      const saleDetailDtos = productId.map((id, index) => ({
        productId: id,
        IME: IME[index],
        warrantyDate: warrantyDate[index],
      }));

      const postData = JSON.stringify({
        customerDto,
        saleDto,
        saleItemDtos,
        saleDetailDtos,
      });
      console.log('data1',postData)
      const response = await createSoldItem(postData);
      console.log('data2',response)
      setCode(response?.data?.code);
      if (response?.data?.code == "200") {
        setWarrantyDate([]);
        setIme([]);
        notify();
      } else {
        insufficientError();
        window.location.href = "/sales";
      }
    } catch (error) {
      notifyError();
      window.location.href = "/sales";
    }
  };

  //using useState for handle add and remove
  const [IME, setIme] = useState(initialValues.IME);
  const [warrantyDate, setWarrantyDate] = useState(initialValues.warrantyDate);

  //handle add and remove when we wanted data extra
  const handleAddAnswerValue = () => {
    setIme(IME.concat(""));
    setWarrantyDate(warrantyDate.concat(""));
  };

  const handleRemoveAnswerValue = (index) => {
    // Filter out the item at the specified index from ime and warrantyDate states
    setIme(IME.filter((_, i) => i !== index));
    setWarrantyDate(warrantyDate.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-[#D9D9D9] flex flex-col p-[0_0_14px_0] box-sizing-border">
      <div className="bg-[#539DF5] relative m-[0_0_24px_0] flex flex-row justify-center p-[14px_7.6px_15px_0] w-[100%] box-sizing-border">
        <span className="break-words font-['Hind_Kochi'] font-bold text-[20px] text-[#000000]">
          Payment
        </span>
      </div>
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          const updatedValues = {
            ...values,
            productId: [],
            quantity: [],
            unitPrice: [],
            userId: [],
          };

          // Update the arrays in the new object
          cartItems.forEach((item) => {
            updatedValues.productId.push(item.id);
            updatedValues.quantity.push(item.quantity);
            updatedValues.unitPrice.push(item.itemOfOne);
            updatedValues.userId.push(id); // Assuming userId is a string
          });

          // console.log("Updated Form Values:", updatedValues.productId);
          values.productId = updatedValues.productId;
          values.unitPrice = updatedValues.unitPrice;
          values.quantity = updatedValues.quantity;
          values.userId = updatedValues.userId;
          values.totalAmount = finalPrice;
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            postSaleItem(values).then((resp) => {
              setCustomerName(values.name);
              setEmail(values.email);
              setPhone(values.phone);
              setWarrantyDate(values.warrantyDate);
              setIsPopupVisible(true);
              resetForm({
                values: {
                  name: "",
                  email: "",
                  phone: "",
                  totalAmount: 0,
                  warrantyDate: [],
                  IME: [],
                },
              });
            });
          }, 400);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <div className="w-[100%]">
              {cartItems.map((item, index) => (
                <div className="bg-white relative m-2 p-3 flex flex-row items-center rounded-md shadow-md">
                  {/* Product Image */}
                  <div className="w-24">
                    <img
                      src={item.image}
                      className="w-20 absolute left-0 mt-2 ml-2 h-20 block top-0 mb-16 rounded-md mr-3"
                      alt={item.name}
                    />
                  </div>
                  {/* Product Details */}
                  <div className="flex flex-col flex-grow">
                    {/* Product Name */}
                    <div className="truncate w-40 font-semibold text-lg text-gray-900 mb-1">
                      {item.name}
                    </div>

                    {/* Product Price */}
                    <span className="font-semibold text-gray-700">
                      ${item.price}
                    </span>

                    {/* Warranty Date Picker */}
                    <div className="rounded-md relative mt-2">
                      <WarrantyDatePicker
                        name={`warrantyDate[${index}]`} // Pass the onChange handler to update Formik's values
                      />
                    </div>

                    {/* IME Input Field */}
                    <div className="rounded-md mt-2">
                      <Field
                        type="text"
                        as="textarea"
                        name={`IME[${index}]`}
                        className="block w-[56%] h-10 rounded-md border border-gray-300 py-1.5 pl-3 pr-10 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                        placeholder="IME..."
                      />
                      {/* Error Message */}
                      {/* Display error message if touched and error exists */}
                      {touched.IME && errors.IME && (
                        <div className="text-red-500">{errors.IME}</div>
                      )}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex flex-row absolute bottom-0 mb-3 right-0">
                    {/* Decrement Button */}
                    <div
                      className="rounded-full rotate-90 mt-2 text-2xl flex items-center justify-center h-8 w-8 mx-2 cursor-pointer bg-red-500 text-white"
                      onClick={() => decrement(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.75.75V16.25a.75.75 0 01-1.5 0V3.75A.75.75 0 0110 3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>

                    {/* Quantity */}
                    <div className="font-semibold mx-3 text-lg mt-2">
                      {item.quantity}
                    </div>

                    {/* Increment Button */}
                    <div
                      className="rounded-full flex items-center justify-center mx-3 cursor-pointer bg-blue-500 text-white h-8 w-8 p-2 mt-2"
                      onClick={() => increment(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a.75.75 0 01.75.75V10h6.25a.75.75 0 010 1.5H10v6.25a.75.75 0 01-1.5 0V11H3.75a.75.75 0 010-1.5H9V3.75A.75.75 0 0110 3z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <div className="flex items-center absolute top-0 mt-2 right-0 me-2 mb-36 ml-3">
                    <FaTrash
                      className="cursor-pointer"
                      onClick={() => removeCart(item.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="m-[0_23px_16px_23px] flex flex-row justify-between w-[calc(100%_-_46px)] box-sizing-border">
              <div>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  class=" block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                  placeholder="Customer Name....?"
                />
                {touched.name && errors.name && (
                  <div className="text-red-500">{errors.name}</div>
                )}
              </div>
              <div>
                <Field
                  type="text"
                  name="phone"
                  id="phone"
                  class=" block  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                  placeholder="Phone Number....?"
                />
                {touched.phone && errors.phone && (
                  <div className="text-red-500">{errors.phone}</div>
                )}
              </div>
            </div>
            <div className="rounded-[5px]  relative m-[0_23px_15px_23px] ">
              <div>
                <Field
                  type="text"
                  name="email"
                  id="email"
                  class=" block w-full  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                  placeholder="Address....?"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500">{errors.email}</div>
                )}
              </div>
            </div>

            
            <div className="rounded-[5px] bg-[#FFFFFF] relative m-[0_23px_13px_23px] flex flex-col p-[6px_17.8px_7px_3px] w-[calc(100%_-_46px)] box-sizing-border">
              <div className="bg-[#000000] absolute left-[7px] top-[33px] right-[16px] h-[1px]"></div>
              <div className="bg-[#000000] absolute left-[7px] right-[16px] bottom-[7px] h-[1px]"></div>
              <div className="bg-[#000000] absolute left-[7px] right-[16px] bottom-[39px] h-[1px]"></div>
              <div className="m-[0_0_4px_0] flex flex-row justify-between w-[100%] box-sizing-border">
                <div className="m-[0_12.5px_3px_0] inline-block w-[367.5px] break-words font-['Hind_Kochi'] font-normal text-[15px] text-[#000000]">
                  Sub Total :
                </div>
                <div className="relative m-[3px_0_0_0] inline-block break-words font-['Hind_Kochi'] font-medium text-[15px] text-[#000000]">
                  ${(totalPrice || 0).toFixed(2)}
                </div>
              </div>
              <div className="m-[0_0_4px_0] flex flex-row justify-between w-[100%] box-sizing-border">
                <div className="m-[0_12.5px_3px_0] inline-block w-[367.5px] break-words font-['Hind_Kochi'] font-normal text-[15px] text-[#000000]">
                  Discount :
                </div>
                <div className="relative m-[3px_0_0_0] inline-block break-words font-['Hind_Kochi'] font-medium text-[15px] text-[#000000]">
                  ${(totalDiscount || 0).toFixed(2)}
                </div>
              </div>
              <div className="flex flex-row justify-between w-[100%] box-sizing-border">
                <div className="m-[0_12.5px_3px_0] inline-block w-[367.5px] break-words font-['Hind_Kochi'] font-normal text-[15px] text-[#000000]">
                  Total Payment :
                </div>
                <div className="relative m-[3px_0_0_0] inline-block break-words font-['Hind_Kochi'] font-medium text-[15px] text-[#1EFF6B]">
                  ${(finalPrice || 0).toFixed(2)}
                </div>
              </div>
            </div>
            <div className="m-[0_21px_0_23px]  flex flex-row justify-between w-[calc(100%_-_44px)] box-sizing-border">
              <div className="">
                <Invoice
                  code={code}
                  name={customerName}
                  email={email}
                  phone={phone}
                  warrantyDate={warrantyDate}
                  product={products}
                  totalPrice={totalPrice}
                  finalPrice={finalPrice}
                  totalDiscount={totalDiscount}
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

const WarrantyDatePicker = ({ name }) => {
  const { setFieldValue, touched, errors } = useFormikContext(); // Access Formik's context
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const formattedDate = format(date, "dd-MM-yyyy");

    setFieldValue(name, formattedDate); // Update Formik's values with the selected date
  };

  return (
    <div className="mt-3">
      <DatePicker
        placeholderText="Warranty date...?"
        id={name}
        name={name}
        selected={selectedDate}
        onChange={handleDateChange}
        className="rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
        dateFormat="dd-MM-yyyy" // Only show day, month, and year
        showYearDropdown
        scrollableYearDropdown
        yearDropdownItemNumber={15} // Change the number of years displayed in the year dropdown
      />
      {touched[name] && errors[name] && (
        <div className="text-red-500">{errors[name]}</div>
      )}
    </div>
  );
};
export default Calu_sale;
