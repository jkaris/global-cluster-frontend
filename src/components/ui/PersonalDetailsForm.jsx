import React from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../hooks/auth/useUser";
import { useUpdateUserProfileMutation } from "../../features/auth/authApiSlice";
import { useUpdateBusinessProfileMutation } from "../../features/business/businessApiSlice";

function PersonalDetailsForm() {
  const { user } = useUser();
  const [updateUserProfile] = useUpdateUserProfileMutation();
  const [updateBusinessProfile] = useUpdateBusinessProfileMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      email: user?.email || "",
      name: user?.name || "",
      gender: user?.gender || "",
      user_id: user?.id || user?.user_id,
    },
  });
  const _id = user?.id || user?.user_id;

  const onSubmit = async (data) => {
    try {
      if (user?.user_type === "company") {
        console.log(data);
        const responseData = await updateBusinessProfile({
          ...data,
          _id,
        }).unwrap();
      }
      if (user?.user_type === "individual") {
        const responseData = await updateUserProfile({ ...data, _id }).unwrap();
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
        {user?.user_type === "individual" && (
          <>
            <div className=" gap-x-6 grid grid-cols-2 w-1/3">
              <div className="flex w-full flex-col gap-2 text-gray-500">
                <label htmlFor="first_name">First Name</label>
                <input
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 w-full focus:border-primary-light transition-all duration-300 ease-in-out"
                  type="text"
                  id="first_name"
                  placeholder="First Name"
                  {...register("first_name")}
                />
                {errors.first_name && (
                  <span className="text-red-500">
                    {errors.first_name.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full gap-2 text-gray-500">
                <label htmlFor="last_name">Last Name</label>
                <input
                  className="outline-none border border-gray-300 rounded-md px-4 py-3 w-full focus:border-primary-light transition-all duration-300 ease-in-out"
                  type="text"
                  id="last_name"
                  placeholder="Last Name"
                  {...register("last_name")}
                />
                {errors.last_name && (
                  <span className="text-red-500">
                    {errors.last_name.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 text-gray-500">
              <label htmlFor="gender">Gender</label>
              <input
                className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
                type="text"
                id="gender"
                placeholder="Gender"
                {...register("gender")}
              />
              {errors.gender && (
                <span className="text-red-500">{errors.gender.message}</span>
              )}
            </div>
          </>
        )}
        {user?.user_type === "company" && (
          <div className="flex flex-col gap-2 text-gray-500">
            <label htmlFor="name">Business Name</label>
            <input
              className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
              type="text"
              id="name"
              placeholder="Global Cluster"
              value={user?.name}
              {...register("name")}
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
        )}
        <div className="flex flex-col gap-2 text-gray-500">
          <label htmlFor="email">Email Address</label>
          <input
            className="outline-none border border-gray-300 rounded-md px-4 py-3 w-1/3 focus:border-primary-light transition-all duration-300 ease-in-out"
            type="email"
            id="email"
            placeholder="example@gmail.com"
            value={user?.email}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
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

export default PersonalDetailsForm;
