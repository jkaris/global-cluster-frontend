import React, { useContext, useEffect, useState } from "react";
import AddTicket from "../../components/AddTicket";
import Pagination from "../../components/Pagination";
import Filter from "../../components/ui/Filter";
import BusinessDashboardHeader from "../../components/ui/Header";
import PageDataHeader from "../../components/ui/PageDataHeader";
import TableData from "../../components/ui/TableData";
import { ModalContext } from "./../../App";
import ActionNotification from "./../../components/ActionNotification";
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
  const totalPages = Math.ceil(ticketsData.length / itemsPerPage);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const paginatedData = ticketsData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
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
  const sumTickets = ticketsData.length;
  const countResolvedTickets = (status) => {
    return ticketsData.filter((ticket) => ticket.status === "resolved").length;
  };
  const countInProgressTickets = (status) => {
    return ticketsData.filter((ticket) => ticket.status === "in-progress")
      .length;
  };
  const resolvedTickets = countResolvedTickets("resolved");
  const progressTickets = countInProgressTickets("in-progress");

  return (
    <div className="bg-gray-50">
      <BusinessDashboardHeader />
      <main className="m-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
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
        <section className="p-10 ">
          <div className="p-8 flex flex-col gap-10">
            <Filter data={ticketsData} setProductFunction={setTicketsData} />
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
