"use client";
import { addToCart } from "@/store/features/cart/cartSlice";
import { useGetRequestProductsQuery } from "@/store/features/product/requestProductApi";
import React from "react";
import { BsCartFill } from "react-icons/bs";
import { FaCartShopping } from "react-icons/fa6";
import { useDispatch } from "react-redux";

const Add_sale = () => {
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetRequestProductsQuery();



  const dispatch = useDispatch()

  const addProductToCart = (id) => {
    const selectedProduct = product?.data.find(p => p.id === id);
    if (selectedProduct) {
      const { id, productImage: image, price, name,discount } = selectedProduct;
      console.log(selectedProduct)
      const productToAdd = { id, image, price, name,discount };
      dispatch(addToCart(productToAdd));
    }
  };


  
  
  return (
    <div className="container">
      <div className="bg-[#D9D9D9] w-[100%] h-auto p-3 ml-3 rounded">
        <di>
          <div className="mt-5 ml-2 gap-2 flex p-4">
            <div>
              <button className="btn bg-blue-600 p-2 hover:bg-blue-800 rounded font-bold text-white">
                Home
              </button>
            </div>
            <div className="ml-24">
              <input className="block w-72 hover:bg-white  border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            </div>
            <div className="flex gap-2">
              <button className="btn bg-blue-600 rounded-xl p-2 text-white font-medium hover:bg-blue-800">
                Categories
              </button>
              <button>Categories</button>
            </div>
          </div>
        </di>
        <div className="mt-2 ml-1 container">
          <div>
            <div className="grid gap-1 grid-cols-4">
              {product?.data?.map((products, index) => (
                <div>
                  <div key={index} className="bg-white w-44 p-6 rounded-lg shadow-lg max-w-sm">
                    <img
                      alt={products?.name}
                      className="w-full h-44"
                      src={products?.productImage}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                    <h2 className="text-[14px] truncate  font-bold mt-4 mb-2">
                      {products?.name}
                    </h2>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-[16px] font-bold">{products?.price}</span>
                      <div className="bg-black text-white w-8 h-7 cursor-pointer hover:bg-slate-500 justify-center ms-2 rounded-md flex items-center">
                      <FaCartShopping onClick={() => addProductToCart(products.id)} className="w-4 h-4  mr-0" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              
            </div>
            {/* Order end */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add_sale;
