import React, { useContext, useEffect, useState } from "react";
import AdminDashboardHeader from "./../../components/ui/Header";
import { ModalContext } from "../../App";
import AddStaff from "../../components/ui/AddStaff.jsx";
import PageDataHeader from "../../components/ui/PageDataHeader.jsx";
import Button from "../../components/Button.jsx";
import Modal from "../../components/Modal.jsx";
import ActionNotification from "../../components/ActionNotification.jsx";
import TableData from "../../components/ui/StaffTableData.jsx";
import Pagination from "../../components/Pagination.jsx";
import { itemsPerPage } from "../../lib/constants.js";
import {
  useAddStaffMutation,
  useStaffsMutation,
  useStaffMutation,
  useUpdateStaffMutation,
} from "../../features/staff/staffApiSlice";

function StaffManagement() {
  const [staffData, setStaffData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [staff] = useStaffMutation();
  const [staffs] = useStaffsMutation();
  const [addStaff] = useAddStaffMutation();
  const { showModal, setShowModal } = useContext(ModalContext);
  const [showAction, setShowAction] = useState(false);
  async function addNewStaff(formData) {
    try {
      const response = await addStaff(formData).unwrap();
      const [first_name, ...lastNameParts] = response.name.split(" ");
      const last_name = lastNameParts.join(" ");
      const newStaffMember = {
        ...response,
        first_name,
        last_name,
      };
      setStaffData([...staffData, newStaffMember]);
      setShowModal(false);
      showTemporaryNotification();
    } catch (error) {
      throw new Error("Failed to add staff details");
    }
  }

  async function handleShowStaffDetails(staffId) {
    try {
      const staffData = await staff(staffId).unwrap();

      return staffData;
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", JSON.stringify(error.response));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", error.message);
      }
    }
  }

  function showTemporaryNotification() {
    setShowAction(true);
    setTimeout(() => {
      setShowAction(false);
    }, 2000);
  }

  useEffect(() => {
    const fetchedStaffs = async () => {
      try {
        const response = await staffs().unwrap();

        setStaffData(response);
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
    fetchedStaffs();
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentStaff = staffData.slice(startIndex, endIndex);

  return (
    <div className="bg-gray-50 h-full w-full">
      <div className="bg-white">
        <AdminDashboardHeader />
        <main className="m-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
          <div className="py-20 px-20 flex flex-col gap-10">
            <div className="flex justify-between items-center">
              <PageDataHeader name="Staff" to="Staff" />
              <Button
                onClick={() => setShowModal(!showModal)}
                btnText="Add Staff Details"
              />
            </div>
            {showModal && (
              <Modal>
                <AddStaff
                  addNewStaff={addNewStaff}
                  CloseModalWindow={setShowModal}
                  currentStatus={showModal}
                />
              </Modal>
            )}

            {showAction && (
              <Modal>
                <ActionNotification message="Staff Details Added Successfully" />
              </Modal>
            )}
            <section className="flex flex-col gap-6">
              <div className="flex flex-col gap-10">
                <TableData
                  data={currentStaff}
                  tableHeadNames={["Name", "Phone Number", "Role", "Action"]}
                  handleShowStaffDetails={handleShowStaffDetails}
                />
                <Pagination
                  currentPage={currentPage}
                  totalPages={Math.ceil(staffData.length / itemsPerPage)}
                  onPageChange={handlePageChange}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
      <main className="m-10 rounded-xl flex flex-col gap-4"></main>
    </div>
  );
}

export default StaffManagement;
