"use client"
import React, { useState } from "react";
import { useDeleteRequestUserMutation, useGetRequestUsersQuery } from "@/store/features/auth/authApiSlice";
import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import Modal from "@/components/stock/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Tableuser = () => {
    const {data:users,isLoading:userLoading,error:userError} = useGetRequestUsersQuery();
    const [showModal, setShowModal] = useState(false);
    const [selectedRecord, setSelectedRecord] = useState(null);
    const [deleteUser] = useDeleteRequestUserMutation()
    const handleDeleteRecord = () => {
        if (selectedRecord) {
          switch (selectedRecord.type) {
            case "user":
              deleteUser(selectedRecord.id)
                .then(() => {
                  setSelectedRecord(null);
                  setShowModal(false);
                  toast.error("user has been deleted successfully!", {
                    theme: "colored",
                    icon: "🗑️",
                    autoClose: 1000,
                    position: "top-center",
                  });
                })
                .catch((error) => {
                  console.error(error);
                  toast.error("Failed to delete the user.", {
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
          name: "ID",
          selector: (row) => (row.id ? row.id : "N/A"),
        },
        {
          name: "First Name",
          selector: (row) => (row.firstname ? row.firstname : "N/A"),
        },
        {
            name: "Last Name",
            selector: (row) =>
              row.lastname ? <div className="w-60">{row.lastname}</div> : "N/A",
          },
        {
            name: "Email",
            selector: (row) => (row.email ? row.email : "N/A"),
          },
        {
          name: "Action",
          selector: (row) => (
            <div className="flex gap-1 justify-center">
              <button
                onClick={() =>
                  handleConfirmDelete({ type: "user", id: row.id })
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
        <div className="bg-white w-[134%] h-auto shadow-lg mt-4 ml-4">
            <div className="bg-sky-600 w-[100%] p-[15px]">
                <div className="ml-6  font-bold">
                    <div className="text-white ">list Users</div>
                </div>
            </div>
            <div className="overflow-x-auto">
              {users && users.data ? (
                <DataTable
                  columns={colunm}
                  data={users.data}
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

export default Tableuser;