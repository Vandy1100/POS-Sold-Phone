"use client";
import { addToCart } from "@/store/features/cart/cartSlice";
import React, { useEffect, useState } from "react";
import { BsCartFill } from "react-icons/bs";
import { FaCartShopping,FaTag  } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import style from "./saleitem.module.css";
import { useGetRequestProductToSalesQuery } from "@/store/features/soldItem/RequestSoldItemApi";
const Add_sale = () => {
  const [search, setSearch] = useState();
  const [productItem, setProductItem] = useState();
  const {
    data: product,
    isLoading: productLoading,
    error: productError,
  } = useGetRequestProductToSalesQuery();

  const dispatch = useDispatch();

  const addProductToCart = (id) => {
    const selectedProduct = product?.data.find((p) => p.id === id);
    if (selectedProduct) {
      const {
        id,
        productImage: image,
        price,
        name,
        discount,
        cost
      } = selectedProduct;
      console.log(selectedProduct);
      const productToAdd = { id, image, price, name, discount, cost };
      dispatch(addToCart(productToAdd));
    }
  };

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  // Filter sale items based on start and end dates
  useEffect(() => {
    if (product && product.data) {
      const filteredItems = product.data.filter((item) => {
        if (search) {
          // Convert both item name and search term to lowercase for case-insensitive comparison
          const itemName = item.name.toLowerCase();
          const searchTerm = search.toLowerCase();
          return itemName.includes(searchTerm);
        }
        return true;
      });
      setProductItem(filteredItems);
    }
  }, [product, search]);

  return (
    <div className="container">
      <div className="bg-[#D9D9D9] border m-2   w-[100%] h-auto p-3 ml-3 rounded">
        <div>
          <div className="mt-5 justify-between  gap-2 flex ms-1 py-4">
            <div>
              <button className="btn bg-blue-600 p-2 hover:bg-blue-800 rounded font-bold text-white">
                Home
              </button>
            </div>
            <div className="ml-24">
              <div className="flex align-middle">
                <form onChange={handleSearch}>
                  <button
                    type="submit"
                    data-collapse-toggle="navbar-search"
                    aria-controls="navbar-search"
                    aria-expanded="false"
                    className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1"
                  >
                    <svg
                      className="w-5 h-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                    <span className="sr-only">Search</span>
                  </button>
                  <div className="relative hidden md:block">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 20"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                      <span className="sr-only">Search icon</span>
                    </div>
                    <input
                      type="search"
                      id="search-navbar"
                      className="block xl:w-[12rem] md:w-[18rem] p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="Search..."
                    />
                  </div>
                </form>
              </div>{" "}
            </div>
          </div>
        </div>
        <div className="mt-2 ml-1 container">
          <div>
            <div
              className={`grid overflow-y-scroll  gap-x-3 gap-y-3 grid-cols-3 ${style["no-scrollbar"]}`}
            >
              {productItem?.map((product, index) => (
                <div
                  key={index}
                  className="border rounded-lg  shadow-md p-4 bg-white w-[250px]"
                >
                  <img
                    src={product.productImage}
                    alt={product.name}
                    className="bg-[#D9D9D9] mb-4 w-full h-48  rounded-md"
                    style={{
                      objectFit: "cover",
                    }}
                  />
                  <h6
                    className="font-semibold text-[18px]  mb-2 truncate"
                  >
                    {product.name}
                  </h6>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[16px] font-semibold">
                      ${product.price}
                    </span>
                    <div className="relative flex items-center">
          <FaTag className="text-red-600 w-9 h-9" />
          <span className="absolute inset-0 flex items-center justify-center text-[12px] text-white font-semibold">
            {product.discount}%
          </span>
        </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => addProductToCart(product.id)}
                      className="bg-black text-white w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-slate-500 rounded-md"
                    >
                      <FaCartShopping className="w-4 h-4" />
                    </button>
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
