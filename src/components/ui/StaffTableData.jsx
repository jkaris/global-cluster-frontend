import PropTypes from "prop-types";
import React, { useState } from "react";
import { GrEdit } from "react-icons/gr";
import Modal from "../Modal";
import EditStaff from "../EditStaff";

function TableData({
  data = [],
  tableHeadNames = [],
  onDelete,
  handleShowStaffDetails,
}) {
  const [showEditDetail, setEditStaffDetail] = useState(false);
  const [staffDetail, setStaffDetail] = useState({});

  async function handleEditStaff(item) {
    const data = await handleShowStaffDetails(item.id);
    setStaffDetail(data);
    setEditStaffDetail(true);
  }

  return (
    <div className="overflow-hidden rounded-t-xl rounded-l-xl rounded-r-xl border-t border-l border-r">
      <table className="w-full text-xl">
        <thead className="rounded-t-xl bg-[#f9f9fc]">
          <tr>
            {tableHeadNames.map((item, index) => (
              <th
                key={index}
                className={`p-6 ${index === 0 ? "flex gap-3" : "text-left"}`}
              >
                <p>{item}</p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr key={index} className="border-t my-2">
              <td className="p-6">{`${item.first_name}`}</td>
              <td className="p-6">{`${item.last_name}`}</td>
              <td className="p-6">{item.email}</td>
              <td className="p-6">{item.phone_number}</td>
              <td className="p-6">{item.role}</td>
              <td className="p-6">
                <p
                  className={`px-4 py-1 rounded-xl w-fit text-center ${
                    item.is_active
                      ? "bg-green-100 text-green-500"
                      : "bg-red-100 text-red-500"
                  }`}
                >
                  {item.is_active ? "Active" : "Inactive"}
                </p>
              </td>
              <td className="flex gap-4">
                <GrEdit
                  style={{ fontSize: "1.5rem", cursor: "pointer" }}
                  onClick={() => handleEditStaff(item)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {showEditDetail && (
        <Modal>
          <EditStaff setEditDetail={setEditStaffDetail} item={staffDetail} />
        </Modal>
      )}
    </div>
  );
}

TableData.propTypes = {
  data: PropTypes.array,
  tableHeadNames: PropTypes.array,
  onDelete: PropTypes.func,
  handleShowStaffDetails: PropTypes.func,
};

export default TableData;
