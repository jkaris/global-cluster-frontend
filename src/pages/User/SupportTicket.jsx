import React, { useContext, useEffect, useState } from "react";
import Pagination from "../../components/Pagination";
import Filter from "../../components/ui/Filter";
import BusinessDashboardHeader from "../../components/ui/Header";
import PageDataHeader from "../../components/ui/PageDataHeader";
import TableData from "../../components/ui/TableData";
import { ModalContext } from "./../../App";
import ActionNotification from "./../../components/ActionNotification";
import AddTicket from "./../../components/AddTicket";
import Button from "./../../components/Button";
import Modal from "./../../components/Modal";
import TicketCard from "./../../components/ui/TicketCard";

import {
  useAddTicketMutation,
  useTicketsMutation,
} from "../../features/ticket/ticketApiSlice";

function SupportTicket() {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [showAction, setShowAction] = useState(false);
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

  // Calculate start and end index for current page
  const startIndex = (currentPage - 1) * itemsPerPage + 1;
  const endIndex = Math.min(currentPage * itemsPerPage, ticketsData.length);

  // Slice the data array based on currentPage and itemsPerPage
  const paginatedData = ticketsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  async function addNewTicket(newTicket) {
    try {
      const response = await addTicket(newTicket).unwrap();

      setTicketsData([...ticketsData, response]);
      setShowModal(false);
      showTemporaryNotification();
    } catch (error) {
      throw new Error("Error:" + JSON.stringify(error));
    }
  }

  function showTemporaryNotification() {
    setShowAction(true);
    setTimeout(() => {
      setShowAction(false);
    }, 1500);
  }
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
      <BusinessDashboardHeader />
      <main className="mx-10 my-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
        <section className="px-20 py-20 flex justify-between items-center">
          <PageDataHeader
            name="Support Ticket"
            to="Support Ticket"
            btnText="Submit a ticket"
          />
          <Button
            onClick={() => setShowModal(!showModal)}
            btnText="Submit a ticket"
          />

          {showModal && (
            <Modal>
              <AddTicket
                CloseModalWindow={setShowModal}
                currentStatus={showModal}
                addNewTicket={addNewTicket}
              />
            </Modal>
          )}

          {showAction && (
            <Modal>
              <ActionNotification message="Ticket Added Successfully" />
            </Modal>
          )}
        </section>

        <section className=" p-10  bg-gray-50  rounded-xl m-20 flex gap-8">
          <TicketCard name="Total Complaints" numbers={sumTickets} />
          <TicketCard name="Resolved Complaints" numbers={resolvedTickets} />
          <TicketCard name="In Progress Complaints" numbers={progressTickets} />
        </section>
        <section className="p-10 space-y-20">
          <div className="p-8 flex flex-col gap-10">
            <Filter />
            <TableData
              type="supportTicket"
              data={paginatedData}
              tableHeadNames={[
                "Reference Id",
                "Date",
                "Last Updated",
                "Subject",
                "Status",
                "Priority",
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
