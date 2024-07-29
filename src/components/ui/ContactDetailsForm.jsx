import React from "react";
import countries from "../../lib/countries.json";
import { useUser } from "../../hooks/auth/useUser";
import { useForm } from "react-hook-form";
import { useUpdateUserProfileMutation } from "../../features/auth/authApiSlice";
import { useUpdateBusinessProfileMutation } from "../../features/business/businessApiSlice";
import { loginAction } from "../../features/auth/authSlice";
function ContactDetailsForm() {
  const { user } = useUser();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      address: user?.profile?.address || "",
      country: user?.profile?.country || "Andorra",
      state: user?.profile?.state || "",
      city: user?.profile?.city || "",
      phone_no: user?.profile?.phone_no || "",
    },
  });
  const id = user?.profile?.user_id ;

  const onSubmit = async (data) => {
    try {
      if (user?.user_type === "company") {
        const responseData = await updateBusinessProfile({...data,id}).unwrap();
      }
      if (user?.user_type === "individual") {
        const responseData = await updateUserProfile({...data,id}).unwrap();
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
      <h2 className="text-3xl font-semibold">Account Settings</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="address">Address</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="address"
            name="address"
            placeholder="Enter your address"
            {...register("address")}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="country">Country</label>
          {/* <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="country"
            name="country"
            placeholder="Enter your country"
          /> */}
          <select
            id="country"
            className="outline-none border border-gray-300 rounded-md px-4 py-4 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            {...register("country")}
          >
            {countries.countries.country.map((country, index) => (
              <option key={index} className="py-3" value={country.countryName}>
                {country.countryName}
              </option>
            ))}{" "}
          </select>
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="state">State</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="state"
            name="state"
            placeholder="Enter your state"
            {...register("state")}
          />
          {errors.state && (
            <span className="text-red-500">{errors.state.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="city">City</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="city"
            name="city"
            placeholder="Enter your City"
            {...register("city")}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="phone_number">Phone No</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="text"
            id="phone_number"
            name="phone_number"
            placeholder="Enter your Phone No"
            {...register("phone_number")}
          />
          {errors.phone_no && (
            <span className="text-red-500">{errors.phone_no.message}</span>
          )}
        </div>
        <button
          type="submit"
          className="bg-primary-light text-white w-fit px-6 rounded-md py-4"
        >
          Save Contact Details
        </button>
      </form>
    </div>
  );
}

export default ContactDetailsForm;
