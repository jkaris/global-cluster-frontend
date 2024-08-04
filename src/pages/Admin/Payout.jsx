import React from "react";
import Header from "./../../components/ui/Header";
import UserDataTable from "../../components/UserDataTable.jsx";
import Filter from "../../components/ui/Filter.jsx";
import TicketCard from "../../components/ui/TicketCard.jsx";

function Payouts() {
  return (
    <div className="bg-gray-50">
      <Header />
      <main className="bg-white m-20 p-10 rounded-lg">
        <h2 className="text-4xl font-semibold">Payout</h2>
        <section className=" p-10  bg-gray-50  rounded-xl m-20 flex gap-8">
          <TicketCard name="Requested Payout" numbers={520} />
          <TicketCard name="Approved Payout" numbers={230} />
          <TicketCard name="Paid Payout" numbers={20} />
          <TicketCard name="Rejected Payout" numbers={20} />
        </section>
        <div className="py-20 px-2">
          <Filter type="payout" />
          <br />

          <UserDataTable
            type="company"
            tableHeadNames={[
              "User",
              "Reference ID",
              "Date",
              "Amount",
              "Action",
            ]}
          />
        </div>
      </main>
    </div>
  );
}

export default Payouts;
