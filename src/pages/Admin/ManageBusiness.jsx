import AdminDashboardHeader from "./../../components/ui/Header";

import React, { useContext, useEffect, useState } from "react";

import { itemsPerPage } from "../../lib/constants";
import UserDataTable from "../../components/UserDataTable";
import { IoMdAdd } from "react-icons/io";
import Filter from "../../components/ui/Filter";
import Pagination from "../../components/Pagination";
import { useGetBusinessMutation } from "../../features/business/businessApiSlice";
import Modal from "../../components/Modal";
import { ModalContext } from "../../App";
import AddBusiness from "../../components/AddBusiness";

function ManageBusiness() {
  const [businessData, setBusinessData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getBusiness] = useGetBusinessMutation();
  const { showModal, setShowModal } = useContext(ModalContext);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentBusinesses = businessData.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await getBusiness().unwrap();
        setBusinessData(response);
      } catch (error) {
        if (error.response) {
          // Server errors (status code outside of 2xx range)
          console.error("Server Error:", JSON.stringify(error.response));
        } else if (error.request) {
          // Network errors or no response from server
          console.error("Network Error:", error.message);
        } else {
          // Other errors
          console.error("Error:", error.message);
        }
      }
    };
    fetchBusinesses();
  }, []);
  return (
    <div className="flex flex-col gap-8 bg-gray-50">
      <AdminDashboardHeader />
      <main className="m-10 bg-white">
        <div className="py-20 px-20 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <p className="font-bold text-5xl">Business Management</p>
            <div
              onClick={() => {
                setShowModal(!showModal);
              }}
              className="bg-primary-light text-white font-semibold w-fit 
    px-4 py-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"
            >
              <IoMdAdd />
              <p>Add Business</p>
            </div>
          </div>
          {showModal && (
            <Modal>
              <AddBusiness
                CloseModalWindow={setShowModal}
                currentStatus={showModal}
              />
            </Modal>
          )}
          <section className="flex flex-col gap-6">
            <Filter data={businessData} setProductFunction={setBusinessData} />
            <div className="flex flex-col gap-10">
              <UserDataTable
                type="admin_manage_business"
                data={currentBusinesses}
                tableHeadNames={[
                  "Business Name",
                  "Email Address",
                  "Phone No",
                  "Date",
                  "Status",
                  "Action",
                ]}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(businessData.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ManageBusiness;
