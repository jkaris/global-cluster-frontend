import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { useWalletMutation } from "../features/user/userApiSlice";
import { useForm } from "react-hook-form";

function AddPayout({ CloseModalWindow, currentStatus }) {
  const [walletData, setWalletData] = useState([]);
  const [wallet] = useWalletMutation();

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Fetch wallet data on component mount
  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await wallet().unwrap();
        setWalletData(response);
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
    fetchWalletData();
  }, [wallet]);

  const modalRef = useRef(null);

  // Close modal if clicking outside of it
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      CloseModalWindow(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle form submission
  const onSubmit = async (data) => {
    console.log("Form Data:", data);
    // Implement your submit logic here
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div
        ref={modalRef}
        className="w-[55rem] font-thin rounded-xl border bg-white p-40"
      >
        <div className="w-full flex flex-col gap-4">
          {/* Display wallet balance */}
          <div className="border-dashed border-primary px-4 bg-primary/30 py-8 rounded-md flex flex-col items-start">
            <span className="text-slate-700 font-bold text-2xl ">Wallet Balance</span>
            <span className="text-xl font-bold">
              {walletData.balance ? `₦${walletData.balance}` : "Loading..."}
            </span>
          </div>

          {/* Form for adding payout */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Bank Selection */}
            <div className="flex flex-col gap-2">
              <label htmlFor="bank">Select Bank</label>
              <select
                id="bank"
                className="p-6 border outline-none rounded-md"
                {...register("bank", {
                  required: "Bank selection is required",
                })}
              >
                {walletData.banks &&
                  walletData.banks.map((bank) => (
                    <option key={bank.id} value={bank.name}>
                      {bank.name}
                    </option>
                  ))}
              </select>
              {errors.bank && (
                <p className="text-red-500">{errors.bank.message}</p>
              )}
            </div>

            {/* Account Number */}
            <div className="flex flex-col gap-2">
              <label htmlFor="accountNumber">Account Number</label>
              <input
                id="accountNumber"
                className="p-6 border outline-none rounded-md"
                type="text"
                {...register("accountNumber", {
                  required: "Account number is required",
                })}
              />
              {errors.accountNumber && (
                <p className="text-red-500">{errors.accountNumber.message}</p>
              )}
            </div>

            <span className="text-primary ">
              {walletData.accountName || "Loading Accout..."}
            </span>

            {/* Amount */}
            <div className="flex flex-col gap-2">
              <label htmlFor="amount">Amount</label>
              <input
                id="amount"
                className="p-6 border outline-none rounded-md"
                type="number"
                step="0.01"
                {...register("amount", { required: "Amount is required" })}
              />
              {errors.amount && (
                <p className="text-red-500">{errors.amount.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-primary text-white p-4 w-32 ml-auto rounded-4xl"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

AddPayout.propTypes = {
  CloseModalWindow: PropTypes.func.isRequired,
  currentStatus: PropTypes.bool.isRequired,
};

export default AddPayout;
