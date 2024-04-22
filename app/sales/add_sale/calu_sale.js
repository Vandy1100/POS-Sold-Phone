import {
  decrementQuantity,
  incrementQuantity,
  removeAllCart,
  removeFromCart,
  selectCartItems,
  selectFinalPrice,
  selectTotalDiscount,
  selectTotalPrice,
} from "@/store/features/cart/cartSlice";
import { useGetRequestProductsQuery } from "@/store/features/product/requestProductApi";
import { useCreateRequestSoldItemMutation } from "@/store/features/soldItem/RequestSoldItemApi";
import { Field, Form, Formik, validateYupSchema } from "formik";
import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Invoice from "./invoice";
import * as Yup from 'yup';
const Calu_sale = () => {
  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(selectTotalPrice);
  const totalDiscount = useSelector(selectTotalDiscount);
  const finalPrice = useSelector(selectFinalPrice);
  const [isPopupVisible,setIsPopupVisible]=useState(false)
  const [customerName,setCustomerName] = useState("")
  const [email,setEmail] = useState("")
  const [phone,setPhone] = useState("")
  const [products,setProduct] = useState([])
  const [code,setCode] = useState("")
  // const [price,setPrice] = useState([])
  // const [quantity, setQuantity] = useState(0); // Initial quantity
  const dispatch = useDispatch();
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
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Address is required'),
    phone: Yup.string().required('Phone number is required'),
  });

  

  cartItems.forEach((item) => {
    initialValues.productId.push(item.id);
    initialValues.quantity.push(item.quantity);
    initialValues.unitPrice.push(item.price);
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
  
  
  const [createSoldItem] = useCreateRequestSoldItemMutation()

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

      const postData = JSON.stringify({ customerDto, saleDto, saleItemDtos });
      const response = await createSoldItem(postData);
      setCode(response?.data?.code)
      if (response?.data?.code == '200') {
        notify();
       
      }else{
        insufficientError()
      }
    } catch (error) {
      notifyError();
    }
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
            updatedValues.unitPrice.push(item.price);
            updatedValues.userId.push(1); // Assuming userId is a string
          });
      
          // console.log("Updated Form Values:", updatedValues.productId);
          values.productId = updatedValues.productId
          values.unitPrice = updatedValues.unitPrice
          values.quantity = updatedValues.quantity
          values.userId = updatedValues.userId
          values.totalAmount = finalPrice
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
            postSaleItem(values).then((resp) => {
              console.log("Form values:", values);
              setCustomerName(values.name)
              setEmail(values.email)
              setPhone(values.phone)
              setIsPopupVisible(true);
              resetForm({
                values:{
                    name:"",
                    email:"",
                    phone:"",
                    totalAmount:0
                }
            })
            });
          }, 400);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] relative m-[0_23px_16px_23px] flex flex-row p-[7px_12px_8px_15px] w-[calc(100%_-_46px)] box-sizing-border"
              >
                <img
                  src={item.image}
                  className="bg-[#D9D9D9] m-[10px_20px_12px_0] w-20 h-20 grow basis-[75px]"
                />
                <div className="m-[5px_79.3px_6px_0] flex flex-col grow basis-[118.7px] box-sizing-border">
                  <div className="m-[0_0_20px_0] inline-block break-words font-['Hind_Kochi'] font-semibold text-[16px] text-[#000000]">
                    {item.name}
                  </div>
                  <span className="m-[0_5px_0_5px] self-start break-words font-['Hind_Kochi'] font-semibold text-[16px] text-[#000000]">
                    ${item.price}
                  </span>
                </div>
                <div className="rounded-[100px] relative m-[48px_16px_0_0] flex flex-row justify-center p-[0_7.3px_0_7px] grow basis-[25px] box-sizing-border">
                  <div
                    className="rounded-[100px] cursor-pointer bg-[#F66A6A] absolute left-[2px] top-[10px] right-[0px] h-[25px] w-[25px]"
                    onClick={() => decrement(item.id)}
                  ></div>
                  <span
                    className="relative bottom-[15px] break-words cursor-pointer font-['Hind_Kochi'] font-bold text-[30px] text-[#FFFFFF]"
                    onClick={() => decrement(item.id)}
                  >
                    _
                  </span>
                </div>
                <div className="m-[57px_15px_7px_0] inline-block break-words font-['Hind_Kochi'] font-semibold text-[20px] text-[#000000]">
                  {item.quantity}
                </div>
                <div className="rounded-[100px] relative m-[48px_16px_0_0] flex flex-row justify-center p-[0_7.3px_0_7px] grow basis-[25px] box-sizing-border">
                  <div
                    className="rounded-[100px] cursor-pointer z-10 border  bg-[#6A99F6] absolute left-[4px] top-[10px] right-[0px] h-[25px] w-[25px]"
                    onClick={() => increment(item.id)}
                  ></div>
                  <span
                    className="relative  font-['Hind_Kochi'] cursor-pointer z-20  font-bold text-[30px] text-[#FFFFFF]"
                    onClick={() => increment(item.id)}
                  >
                    +
                  </span>
                </div>
                <div className="m-[0_0_8px_0] flex flex-col items-center grow basis-[41px] box-sizing-border">
                  <FaTrash
                    onClick={() => removeCart(item.id)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            ))}
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
            {/* <div className="rounded-[5px]  relative m-[0_23px_15px_23px] ">
              <div>
                <Field
                  type="number"
                  name="totalAmount"
                  id="totalAmount"
                  class=" block w-full  rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mt-3"
                  placeholder="Cash Payment....?"
                />
                {touched.totalAmount && errors.totalAmount && (
                  <div className="text-red-500">{errors.totalAmount}</div>
                )}
              </div>
            </div> */}
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
            <div className="m-[0_21px_0_23px] flex flex-row justify-between w-[calc(100%_-_44px)] box-sizing-border">
              <div className="">
              <Invoice
              code={code}
              name={customerName}
              email={email}
              phone={phone}
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
      <ToastContainer/>
    </div>
  );
};

export default Calu_sale;
