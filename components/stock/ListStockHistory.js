"use client"
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/stock/Modal";
import { MdDelete } from "react-icons/md";
import AddCategory from "@/components/category/AddCategory";
import DataTable from "react-data-table-component";
import { useDeleteRequestStockMutation, useGetRequestStocksQuery } from "@/store/features/stock/RequestStockApi";

export default function ListStockHistory() {


    const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {
    data: stock,
    isLoading: stockLoading,
    error: stockError,
  } = useGetRequestStocksQuery();

  const [deleteStock] = useDeleteRequestStockMutation();
  const handleDeleteRecord = () => {
    if (selectedRecord) {
      switch (selectedRecord.type) {
        case "stock":
          deleteStock(selectedRecord.id)
            .then(() => {
              setSelectedRecord(null);
              setShowModal(false);
              toast.error("Stock has been deleted successfully!", {
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

  const colunmCategory = [
    {
      name: "ID",
      selector: (row) => (row.id ? row.id : "N/A"),
    },
    {
      name: "Quantity",
      selector: (row) => (row.quantity ? row.quantity : "N/A"),
    },
    {
        name: "Name",
        selector: (row) =>
          row.name ? <div className="w-60">{row.name}</div> : "N/A",
      },
    {
        name: "Stock Date",
        selector: (row) => (row.stockDate ? row.stockDate : "N/A"),
      },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-1 justify-center">
          <button
            onClick={() =>
              handleConfirmDelete({ type: "stock", id: row.id })
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
    <>
    <div>
        <div>
          <div className="bg-white w-[116%] h-auto shadow-lg mt-4 ml-4">
            <div className="bg-sky-400 w-[100%] p-[15px]">
              <div className="ml-6  font-bold">
                <div className="text-white my-2">Stock History</div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {stock && stock.data ? (
                <DataTable
                  columns={colunmCategory}
                  data={stock.data}
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
          </div>
        </div>
      </div>

      <ToastContainer />
    </>
  )
}
