"use client";
import {
  useCreateRequestCategoryMutation,
  useDeleteRequestCategoryMutation,
  useGetRequestCategoriesQuery,
} from "@/store/features/category/RequestCategoryApi";
import { Field, Formik, Form } from "formik";
import React, { useState } from "react";
import * as Yup from "yup"; // import Yup for validation
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modal from "@/components/stock/Modal";
import { MdDelete } from "react-icons/md";
import AddCategory from "@/components/category/AddCategory";
import DataTable from "react-data-table-component";
import UpadteCategory from "@/components/category/UpdateCategory";

const Category = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {
    data: category,
    isLoading: categoryLoading,
    error: categoryError,
  } = useGetRequestCategoriesQuery();

  const [deleteCategory] = useDeleteRequestCategoryMutation();
  const handleDeleteRecord = () => {
    if (selectedRecord) {
      switch (selectedRecord.type) {
        case "category":
          deleteCategory(selectedRecord.id)
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

  const colunmCategory = [
    {
      name: "NO",
      selector: (row) => (row.id ? row.id : "N/A"),
    },
    {
      name: "Category",
      selector: (row) => (row.category ? row.category : "N/A"),
    },
    {
      name: "Description",
      selector: (row) =>
        row.description ? <div className="w-60">{row.description}</div> : "N/A",
    },
    {
      name: "Action",
      selector: (row) => (
        <div className="flex gap-1 justify-center">
          <UpadteCategory id={row.id} />
          <button
            onClick={() =>
              handleConfirmDelete({ type: "category", id: row.id })
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
              <div className="ml-6  font-bold flex flex-wrap justify-between">
                <div className="text-white my-2">List Categorys</div>
                <div className="flex align-middle ">
                  <AddCategory />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {category && category.data ? (
                <DataTable
                  columns={colunmCategory}
                  data={category.data}
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
  );
};

export default Category;
