import React, { useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../features/auth/authApiSlice";

function LoginForm() {
  const [loginType, setLoginType] = useState("Business");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();

  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      console.log(JSON.stringify(response))
      
    } catch (error) {
      console.log(JSON.stringify(error))
    }
  };

  return (
    <form className="space-y-20 px-8" onSubmit={handleSubmit(onSubmit)}>
      <div
        className="flex w-full border border-gray-300 py-4 px-2 gap-4 bg-[#f6f6f9]
       items-center justify-center rounded-md select-none"
      >
        <p
          className={`text-center w-full px-4 py-4 rounded-md cursor-pointer ${
            loginType === "Individual" ? "bg-[#ffffff] text-primary-light border" : ""
          }`}
          onClick={() => setLoginType("Individual")}
        >
          Individual
        </p>
        <p
          className={`text-center w-full px-4 py-4 rounded-md cursor-pointer ${
            loginType === "Business" ? "bg-[#ffffff] text-primary-light border" : ""
          }`}
          onClick={() => setLoginType("Business")}
        >
          Business
        </p>
      </div>
      <div className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="emailOrUsername" className="block text-gray-700">
            Email Address or Username
          </label>
          <input
            id="emailOrUsername"
            name="emailOrUsername"
            type="text" // Change to "text" to allow both email and username
            placeholder="janedoe@xxx.com"
            className="w-full p-4 border border-gray-300 outline-none rounded-2xl"
            {...register("emailOrUsername", {
              required: "Email or Username is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
          />
          {errors.emailOrUsername && (
            <span className="text-red-500">{errors.emailOrUsername.message}</span>
          )}
        </div>
        <div className="space-y-2">
          <label htmlFor="password" className="block text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Enter Your Password"
            className="w-full border border-gray-300 p-4 outline-none rounded-2xl"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Password must be at least 6 characters" },
            })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
        </div>
        <p className="text-xl">
          Forgot password?{" "}
          <span className="font-bold cursor-pointer hover:underline">
            Reset Here
          </span>
        </p>
        <div
          className="w-full bg-primary-light text-white font-semibold py-4 rounded-full hover:bg-primary-dark
        transition duration-300 flex gap-4 items-center justify-center cursor-pointer"
        >
          <button
            type="submit"
            className="flex items-center justify-center gap-4 w-full"
          >
            <HiMiniUserPlus className="text-4xl" />
            <p className="select-none text-4xl font-thin">Login</p>
          </button>
        </div>

        <div className="text-center text-xl">
          <NavLink to="/business-signUp">
            {`Don't`} have an account?{" "}
            <span className="font-semibold hover:underline-offset-1">
              Sign up as Business
            </span>
          </NavLink>
        </div>
      </div>
    </form>
  );
}

export default LoginForm;
