import React, { useEffect, useState } from "react";
import DollarImg from "./../assets/images/dollar.png";
import { usePayoutMutation } from "../features/user/userApiSlice";

function UserDashboardPayout() {
  const [payouts, setPayouts] = useState([]);
  const [payout] = usePayoutMutation();
  useEffect(() => {
    const fetchPayout = async () => {
      try {
        const response = await payout().unwrap();
        setPayouts(response);
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
    fetchPayout();
  }, [payout]);
  return (
    <div className="">
      <p className="font-semibold border-b pb-2">Payout</p>
      <div className="mt-10">
        {payouts?.map((payout) => (
          <div
            key={payout.uuid}
            className="flex justify-between items-center border-b px-8 py-4"
          >
            <div className="flex gap-2 items-center justify-center">
              <img
                className="w-[5rem]"
                src={DollarImg}
                alt="user profile img"
              />
              <div className="flex flex-col gap-1 items-center justify-center">
                <p className="font-semibold capitalize">{payout?.status}</p>
                {/* <p className="text-gray-400">{userName}</p> */}
              </div>
              <p
                className={`text-semibold ${
                  payout?.status === "Requested" && "text-primary-dark"
                }  ${payout?.status === "Approved" && "text-green-400"}  ${
                  payout?.status === "Rejected" && "text-green-400"
                }`}
              >
                {payout?.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboardPayout;
