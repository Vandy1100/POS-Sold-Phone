"use client";
import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { useDeleteRequestProductMutation, useGetRequestProductStocksQuery } from "@/store/features/product/requestProductApi";
import DataTable from "react-data-table-component";
import AddStockProduct from "@/components/stock/AddStockProduct";
import Modal from "@/components/stock/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpadteProduct from "@/components/product/UpdateProduct";
import { IoIosWarning } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import AddDiscount from "@/components/stock/AddDiscount";


const Tableproduct = () => {

    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
  const {
    data: product_stock,
    isLoading,
    error,
  } = useGetRequestProductStocksQuery();



  const [searchResults, setSearchResults] = useState([]);

const handleSearch = (e) => {
  e.preventDefault();
  // Get the search query from the input field
  const searchQuery = e.target.querySelector('#search-navbar').value;

  // Filter products based on search query
  const filteredProducts = product_stock?.data.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Update search results state
  setSearchResults(searchQuery ? filteredProducts : product_stock?.data);
};

useEffect(() => {
    setSearchResults(product_stock?.data);
}, [ product_stock]);


  const[deleteProduct] = useDeleteRequestProductMutation()
  const handleDeleteRecord = () => {
    if (selectedRecord) {
      switch (selectedRecord.type) {
        case "product":
          deleteProduct(selectedRecord.id)
            .then(() => {
              setSelectedRecord(null);
              setShowModal(false);
              toast.error("Product has been deleted successfully!", {
                theme: "colored",
                icon: "🗑️",
                autoClose: 1000,
                position: "top-center",
              });
            })
            .catch((error) => {
              console.error(error);
              toast.error("Failed to delete the product.", {
                theme: "colored",
                icon: "❌",
                autoClose: 1000,
                position: "top-center",
              });
            });
          break; 
        default:
          break;
      }
    }
  };
  const handleCancelDelete = () => {
    setSelectedRecord(null);
    setShowModal(false);
  };

  const handleConfirmDelete = (record) => {
    setSelectedRecord(record);
    setShowModal(true);
  };

  const colunmProduct = [
    {
      name: "NO",
      selector: (row) => row.id ? row.id : "N/A",
      minWidth: "80px",
      maxWidth: "10px"
    },
    {
      name: "Product Name",
      selector: (row) => row.name ? row.name : "N/A",
    },
    {
      name: "Profile",
      selector: (row) => (
        <div className="w-20">
          <img src={row.productImage} alt="Product" height={60} width={60} />
        </div>
      ),
      minWidth: "80px",
      maxWidth: "140px"
    },
    {
      name: "Category",
      selector: (row) => row.category ? row.category.category : "N/A",
      minWidth: "80px",
      maxWidth: "120px"
    },

    {
      name: "QTY",
      selector: (row) => row.quantity ? row.quantity : "0",
      minWidth: "80px",
      maxWidth: "10px"
    },
    {
      name: "Price",
      selector: (row) => row.price ? `$` + row.price : "N/A",
      minWidth: "80px",
      maxWidth: "10px"
    },
    {
      name: "Date",
      selector: (row) => row.productDate ? row.productDate : "N/A",
      minWidth: "80px",
      maxWidth: "120px"
    },
    {
      name: "Discount",
      selector: (row) => row.discount ? row.discount : "0",
      minWidth: "80px",
      maxWidth: "120px"
    },
    {
        name: "Status",
        cell: (row) => {
          if (row.quantity >= 6) {
            return (
              <div className="flex gap-1 justify-center">
                <button className="bg-green-500 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">
                  <CiCircleCheck />
                </button>
              </div>
            );
          } else if (row.quantity <= 5 && row.quantity > 0) {
            return (
              <div className="flex gap-1 justify-center">
                <button className="bg-yellow-200 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded">
                  <IoIosWarning />
                </button>
              </div>
            );
          } else{
            return (
              <div className="flex gap-1 justify-center">
                <button className="bg-red-500 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                  <FaXmark/>
                </button>
              </div>
            );
          }
        },
        minWidth: "80px",
        maxWidth: "10px"
      },
    
    {
      name: "Stock",
      selector: (row) => <AddStockProduct id={row.id} />,
      minWidth: "80px",
      maxWidth: "10px"
    },
    {
      name: "Discount",
      selector: (row) => <AddDiscount id={row.id} />,
      minWidth: "80px",
      maxWidth: "120px"
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-1 justify-center">
          <UpadteProduct id={row.id}/>
          <button
            onClick={() =>
              handleConfirmDelete({ type: "product", id: row.id })
            }
            className="bg-red-600 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  

  return (
    <div className="bg-white w-[116%] h-auto shadow-lg mt-4 ml-4">
      <div className="bg-sky-600 w-[100%] p-[15px]">
        <div className="ml-6 flex flex-wrap justify-between font-bold">
          <div className="text-white my-2">List Products</div>
          <div className="flex align-middle"><form onSubmit={handleSearch}>
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
          </form></div>
        </div>
      </div>
      <div className="overflow-x-auto">
        {searchResults && searchResults? (
          <DataTable
            columns={colunmProduct}
            data={searchResults}
            pagination
          />
        ) : (
          <p>Data is null.</p>
        )}{" "}
      </div>
      {showModal && (
            <Modal
              title="Confirm Delete"
              content={`Are you sure you want to delete this ${selectedRecord?.type}?`}
              onCancel={handleCancelDelete}
              onConfirm={handleDeleteRecord}
            />
          )}
          <ToastContainer/>
    </div>
  );
};

export default Tableproduct;
