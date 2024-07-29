import React, { useEffect, useState } from "react";
import UserDataTable from "../../components/UserDataTable";
import Header from "./../../components/ui/Header";
import Pagination from "../../components/Pagination";
import { useGetBusinessMutation } from "../../features/business/businessApiSlice";

function BusinessRegistrations() {
  const [currentPage, setCurrentPage] = useState(1);
  const [businessesData, setBusinessesData] = useState([]);
  const [getBusiness] = useGetBusinessMutation();
  const itemsPerPage = 5;

  const totalPages = Math.ceil(businessesData.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginatedData = businessesData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await getBusiness().unwrap();
        setBusinessesData(response);
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
    <div className="bg-gray-50">
      <Header />
      <main className="bg-white m-20 p-10 rounded-lg">
        <h2 className="text-4xl font-semibold">Business Registrations</h2>
        <div className="py-20 px-2">
          <UserDataTable
            type="company"
            data={paginatedData}
            tableHeadNames={["User", "Rc or BN", "Email", "Date", "Action"]}
          />
        </div>
        {itemsPerPage <= businessesData.length && (
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

export default BusinessRegistrations;
