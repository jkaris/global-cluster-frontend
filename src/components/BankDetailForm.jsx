// src/components/ui/BankDetailForm.js

import React from "react";
import { useUser } from "../hooks/auth/useUser";
import { useUpdatePasswordMutation } from "../features/auth/authApiSlice";
import { useForm } from "react-hook-form";

function BankDetailForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [updatePassword] = useUpdatePasswordMutation();
  const { user } = useUser();
  const onSubmit = async (data) => {
    try {
      if (user?.user_type === "company") {
        const responseData = await updatePassword({
          ...data,
          user_type: user?.user_type,
        }).unwrap();
      }
      if (user?.user_type === "individual") {
        // const responseData = await updateProfile(data).unwrap();
      }
      if (user?.user_type === "admin") {
        // const responseData = await updateProfile(data).unwrap();
      }
    } catch (error) {
      if (error.response) {
        // Server errors (status code outside of 2xx range)
        console.error("Server Error:", JSON.stringify(error.response.data));
      } else if (error.request) {
        // Network errors or no response from server
        console.error("Network Error:", error.message);
      } else {
        // Other errors
        console.error("Error:", JSON.stringify(error));
      }
    }
  };
  return (
    <div className="flex flex-col gap-16 py-20 px-14">
      <h2 className="text-3xl font-semibold">Primary Bank Details</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="bank-name">Bank Name</label>
          <select
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            id="bank-name"
            // name="bank-name"
            {...register("bank-name")}

          >
            <option>Select Bank Name</option>
            {/* Add more bank options as needed */}
            <option>Bank A</option>
            <option>Bank B</option>
            <option>Bank C</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="account-number">Account Number</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="account-number"
            placeholder="Enter Account Number"
            {...register("accNumber")}
          />
          {errors.accNumber && (
            <span className="text-red-500">{errors.accNumber.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="account-name">Account Name</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="account-name"
            placeholder="Account Name"
            {...register("accName")}
          />
          {errors.accName && (
            <span className="text-red-500">{errors.accName.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary-light text-white w-fit px-6 rounded-md py-4"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default BankDetailForm;
