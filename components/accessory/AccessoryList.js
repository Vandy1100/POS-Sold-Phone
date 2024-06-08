import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { IoIosAddCircle } from "react-icons/io";
import Modal from "../stock/Modal";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import { useDeleteRequestAccessoryMutation, useGetRequestAccessoriesByIdQuery, useGetRequestAccessoriesQuery } from "@/store/features/accessory/RequestAccessoryApi";
import AddAccessory from "./AddAccessory";
export default function AccessoryList({id}) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const {data:accessories,isLoading,error} = useGetRequestAccessoriesByIdQuery(id);  
  const [deleteAccessory] = useDeleteRequestAccessoryMutation()
  const handleDeleteRecord = () => {
    if (selectedRecord) {
      switch (selectedRecord.type) {
        case "accessory":
          deleteAccessory(selectedRecord.id)
            .then(() => {
              setSelectedRecord(null);
              setShowModal(false);
              toast.error("Accessory has been deleted successfully!", {
                theme: "colored",
                icon: "🗑️",
                autoClose: 1000,
                position: "top-center",
              });
            })
            .catch((error) => {
              console.error(error);
              toast.error("Failed to delete the accessory.", {
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

  const colunm = [
    {
      name: "NO",
      selector: (row) => (row.accessoryId ? row.accessoryId : "N/A"),
      minWidth: "60px",
      maxWidth: "100px"
    },
    {
      name: "Profile",
      selector: (row) => (
        <div className="w-20">
          <img src={row.image} alt="Product" height={60} width={60} />
        </div>
      ),
      minWidth: "80px",
      maxWidth: "140px"
    },
    {
      name: "Category",
      selector: (row) => (row.accessory ? row.accessory : "N/A"),
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
          {/* <UpadteCategory id={row.id} /> */}
          <button
            onClick={() =>
              handleConfirmDelete({ type: "accessory", id: row.accessoryId })
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
      <button  onClick={() => setIsModalVisible(true)} class="bg-yellow-400 hover:bg-yellow-600 text-white px-4 py-2 rounded">
              Add Accessory
            </button>

      {isModalVisible && (
        <div
          className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-gray-900 bg-opacity-20 flex justify-center items-center"
          onClick={() => setIsModalVisible(false)}
        >
          <div
            className="bg-white rounded-lg shadow-lg px-8 py-6 w-1/2 h-2/3"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-gray-900">Add Accessory</h3>
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
            
            <div className="bg-white  h-auto shadow-lg mt-4 ">
            <div className="bg-sky-400 p-[15px]">
              <div className="ml-6  font-bold flex flex-wrap justify-between">
                <div className="text-white my-2">List Categorys</div>
                <div className="flex align-middle ">
                  <AddAccessory id={id}/>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              {accessories && accessories?.data ? (
                <DataTable
                  columns={colunm}
                  data={accessories?.data}
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
          <ToastContainer/>
        </div>
      )}
    </>
  );
}
