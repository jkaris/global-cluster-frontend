import React from "react";
import AdminDashboardHeader from "./../../components/ui/Header";
import Header from "./../../components/ui/Header";
import UserDataTable from "../../components/UserDataTable.jsx";
import { navigate } from "jsdom/lib/jsdom/living/window/navigation.js";
import { IoMdAdd } from "react-icons/io";

function BonusMangement() {
  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="bg-white">
        <AdminDashboardHeader />
      </div>
      <div className="bg-gray-50">
        <Header />
        <main className="bg-white m-20 p-10 rounded-lg">
          <div className="py-20 px-20 flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <h2 className="text-4xl font-semibold">Bonus Management</h2>
              <div
                onClick={() => {
                  navigate("/admin/bonus/management/add");
                }}
                className="bg-primary-light text-white font-semibold w-fit
    px-4 py-4 rounded-md flex items-center justify-center gap-4 hover:bg-primary-dark cursor-pointer select-none"
              >
                <IoMdAdd />
                <p>Add New</p>
              </div>
            </div>
            <div className="py-20 px-2">
              <UserDataTable
                type="company"
                tableHeadNames={[
                  "S/N",
                  "Bonus Name",
                  "Created on",
                  "Amount",
                  "Status",
                  "Action",
                ]}
              />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default BonusMangement;
