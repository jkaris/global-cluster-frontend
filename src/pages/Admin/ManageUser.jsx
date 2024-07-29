import AdminDashboardHeader from "./../../components/ui/Header";

import React, { useEffect, useState } from "react";

import { itemsPerPage } from "../../lib/constants";
import UserDataTable from "../../components/UserDataTable";
import { IoMdAdd } from "react-icons/io";
import Filter from "../../components/ui/Filter";
import Pagination from "../../components/Pagination";
import { useNavigate } from "react-router-dom";
import { useGetUsersMutation } from "../../features/user/userApiSlice";

function ManageUser() {
  const [usersData, setUsersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [getUsers] = useGetUsersMutation();

  const navigate = useNavigate();

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentUsers = usersData.slice(startIndex, endIndex);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers().unwrap();
        setUsersData(response);
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
    fetchUsers();
  }, []);
  return (
    <div className="flex flex-col gap-8 bg-gray-50">
      <AdminDashboardHeader />
      <main className="m-10 bg-white">
        <div className="py-20 px-20 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <p className="font-bold text-5xl">Customer Management</p>
            <div
              onClick={() => {navigate("/admin/user/manage/registrations")}}
              className="bg-primary-light text-white font-semibold w-fit 
    px-4 py-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"
            >
              <IoMdAdd />
              <p>Add Individual</p>
            </div>
          </div>

          <section className="flex flex-col gap-6">
            <Filter data={usersData} setProductFunction={setUsersData} />
            <div className="flex flex-col gap-10">
              <UserDataTable
                type="admin_manage_users"
                data={currentUsers}
                tableHeadNames={[
                  "Full Name",
                  "Sponsor",
                  "Rank",
                  "Date",
                  "Tree View",
                  "Status",
                  "Action",
                ]}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(usersData.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default ManageUser;
