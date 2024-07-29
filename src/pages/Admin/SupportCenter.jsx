import AdminDashboardHeader from "./../../components/ui/Header";
import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";

import TableData from "../../components/ui/TableData";
import { ModalContext } from "./../../App";

import TicketCard from "./../../components/ui/TicketCard";

import {
  useAddTicketMutation,
  useTicketsMutation,
} from "../../features/ticket/ticketApiSlice";

function SupportTicket() {
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsData, setTicketsData] = useState([]);
  const [ticket] = useTicketsMutation();
  const [addTicket] = useAddTicketMutation();
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await ticket().unwrap();

        setTicketsData(response);
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
    fetchTickets();
  }, [ticket]);
  const itemsPerPage = 5; // Number of items per page

  // Calculate total pages based on data length and items per page
  const totalPages = Math.ceil(ticketsData.length / itemsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Slice the data array based on currentPage and itemsPerPage
  const paginatedData = ticketsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // Calculate the total number of tickets
  const sumTickets = ticketsData.length;

  // Function to filter and count tickets by progress status
  const countTicketsByProgress = (status) => {
    return ticketsData.filter((ticket) => ticket.progress === status).length;
  };

  // Count the number of resolved and in-progress tickets
  const resolvedTickets = countTicketsByProgress("resolved");
  const progressTickets = countTicketsByProgress("progress");

  return (
    <div className="bg-gray-50">
      <AdminDashboardHeader />
      <main className="mx-10 my-10  rounded-md bg-white">
        <section className="px-20 py-20 flex justify-between items-center">
          <p className="font-bold text-5xl">Support Center</p>
        </section>

        <section className=" p-10  bg-gray-50  rounded-xl m-20 flex gap-8">
          <TicketCard name="Total Tickets" numbers={sumTickets} />
          <TicketCard name="In Progress" numbers={sumTickets} />
          <TicketCard name="Critical" numbers={resolvedTickets} />
          <TicketCard name="New Tickets" numbers={progressTickets} />
        </section>
        <section className="p-10 space-y-20">
          <div className="p-8 flex flex-col gap-10">
            {/* <Filter data={ticketsData} setProductFunction={setTicketsData} /> */}
            <TableData
              type="supportTicket"
              data={paginatedData}
              tableHeadNames={[
                "Subject",
                "Submitted By",
                "status",
                "Priority",
                "Last Reply",
                "Action",
              ]}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default SupportTicket;
