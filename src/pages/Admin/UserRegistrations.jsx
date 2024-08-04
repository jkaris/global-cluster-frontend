import React, { useEffect, useState } from "react";
import UserDataTable from "../../components/UserDataTable";
import Header from "./../../components/ui/Header";
import Pagination from "../../components/Pagination";
import { useGetUsersMutation } from "../../features/user/userApiSlice";

function AdminUserRegistrations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [usersData, setUsersData] = useState([]);
  const [getUsers] = useGetUsersMutation();
  const itemsPerPage = 5;

  const totalPages = Math.ceil(usersData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = usersData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers().unwrap();
        setUsersData(response);
      } catch (error) {
        if (error.response) {
          console.error("Server Error:", JSON.stringify(error.response));
        } else if (error.request) {
          console.error("Network Error:", error.message);
        } else {
          console.error("Error:", error.message);
        }
      }
    };
    fetchUsers();
  }, []);
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="bg-white m-20 p-10 rounded-lg">
        <h2 className="text-4xl font-semibold">User Registrations</h2>
        <div className="py-20 px-2">
          <UserDataTable
            type="default"
            data={paginatedData}
            tableHeadNames={["User", "Email", "Date", "Status", "Action"]}
          />
        </div>
        {itemsPerPage <= usersData.length && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </main>
    </div>
  );
}

export default AdminUserRegistrations;
