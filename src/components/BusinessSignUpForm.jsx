import PropTypes from "prop-types";
import React from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useSignupBusinessMutation } from "../features/business/businessApiSlice";
import countries from "../lib/countries.json";
function BusinessSignUpForm({ companySizeInput }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [signupBusiness] = useSignupBusinessMutation();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const signupData = {
        ...data,
        company_size: companySizeInput,
        user_type: "company",
      };
      const responseData = await signupBusiness(signupData).unwrap();
      navigate(`/login`);
    } catch (error) {
      if (error.data) {
        console.error("Server Error:", JSON.stringify(error.data));
      } else if (error.request) {
        console.error("Network Error:", error.message);
      } else {
        console.error("Error:", JSON.stringify(error));
      }
    }
  };
  return (
    <form className=" " onSubmit={handleSubmit(onSubmit)}>
      {companySizeInput && (
        <div className={`space-y-6  px-8`}>
          <div className="space-y-4">
            <label htmlFor="company_name" className="block text-gray-700">
              company Name<span className="text-red-500">*</span>
            </label>
            <input
              id="company_name"
              type="text"
              placeholder="Dahort Consult"
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
              {...register("company_name", {
                required: "Company Name is required",
              })}
            />
            {errors.company_name && (
              <span className="text-red-500">
                {errors.company_name.message}
              </span>
            )}
          </div>
          <div className="space-y-4">
            <label htmlFor="email" className="block text-gray-700">
              Email Address<span className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="janedoe@xxx.com"
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>
          <div className="space-y-4">
            <label htmlFor="address" className="block text-gray-700">
              Address
            </label>
            <input
              id="address"
              type="text"
              placeholder="Enter your Address"
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
              {...register("address")}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="phone_number" className="block text-gray-700">
              Phone No
            </label>
            <input
              id="phone_number"
              type="tel"
              placeholder="+1 (555) 123-4567"
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
              {...register("phone_number")}
            />
          </div>

          <div className="space-y-4">
            <label htmlFor="country" className="block text-gray-700">
              Country
            </label>
            <select
              id="country"
              name="country"
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
              {...register("country")}
            >
              {countries.countries.country.map((country, index) => (
                <option key={index} className="" value={country.countryName}>
                  {country.countryName}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-4">
            <label
              htmlFor="company_registration_number"
              className="block text-gray-700"
            >
              Country Registration No (RC or BN)
              <span className="text-red-500">*</span>
            </label>
            <input
              id="company_registration_number"
              type="text"
              placeholder="Reg1245669"
              className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
              {...register("company_registration_number", {
                required: "Registration Number is required",
              })}
            />
            {errors.company_registration_number && (
              <span className="text-red-500">
                {errors.company_registration_number.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-700">
              Password<span className="text-red-500">*</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Confirm Your Password"
              className="w-full border border-gray-300 p-4 outline-none rounded-2xl"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="cofirmPassword" className="block text-gray-700">
              Confirm Password<span className="text-red-500">*</span>
            </label>
            <input
              id="cofirmPassword"
              type="password"
              placeholder="Confirm Your Password"
              className="w-full border border-gray-300 p-4 outline-none rounded-2xl"
              {...register("confirmPassword", {
                required: "Confirm Password is required",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>

          <div
            className="w-full bg-primary-light text-white font-semibold py-6 rounded-full hover:bg-primary-dark
        transition duration-300 flex gap-4 items-center justify-center cursor-pointer"
          >
            <button
              type="submit"
              className="flex items-center justify-center gap-4"
            >
              <HiMiniUserPlus className="text-5xl " />
              <p>Sign Up</p>
            </button>
          </div>

          <div className="text-center text-lg">
            <NavLink to="/login">
              {`Don't `} Have an account,{" "}
              <span className="font-semibold">Login Here</span>
            </NavLink>
          </div>
        </div>
      )}
    </form>
  );
}

BusinessSignUpForm.propTypes = {
  companySizeInput: PropTypes.bool.isRequired,
  SetCompanySizeInput: PropTypes.func.isRequired,
};

export default BusinessSignUpForm;
