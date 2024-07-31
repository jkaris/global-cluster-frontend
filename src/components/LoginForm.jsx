import React, { useState } from "react";
import { HiMiniUserPlus } from "react-icons/hi2";
import { NavLink, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { loginAction } from "../features/auth/authSlice";
import { TypeLogin } from "../lib/constants";
import { useLoginBusinessMutation } from "../features/business/businessApiSlice";
import { useLoginAdminMutation } from "../features/admin/adminApiSlice.js";

function LoginForm() {
  const [loginType, setLoginType] = useState(TypeLogin.BUSINESS);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [login] = useLoginMutation();
  const [loginBusiness] = useLoginBusinessMutation();
  const [loginAdmin] = useLoginAdminMutation();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      let responseData;
      let navigatePath;

      switch (loginType) {
        case TypeLogin.INDIVIDUAL:
          responseData = await login({
            ...data,
            user_type: loginType,
          }).unwrap();
          navigatePath = "/user/dashboard";
          break;
        case TypeLogin.BUSINESS:
          responseData = await loginBusiness({
            ...data,
            user_type: "company",
          }).unwrap();
          navigatePath = "/business/dashboard";
          break;
        case TypeLogin.ADMIN:
          responseData = await loginAdmin({
            ...data,
            user_type: "admin",
          }).unwrap();
          navigatePath = "/admin/dashboard";
          break;
        default: {
          break;
        }
      }

      const { access, refresh, user } = responseData;
      dispatch(loginAction({ access, refresh, user }));
      navigate(navigatePath);
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

  return (
    <form className="space-y-20 px-8" onSubmit={handleSubmit(onSubmit)}>
      <div
        className="flex w-full border border-gray-300 py-4 px-2 gap-4 bg-[#f6f6f9]
       items-center justify-center rounded-md select-none"
      >
        {[TypeLogin.INDIVIDUAL, TypeLogin.BUSINESS, TypeLogin.ADMIN].map(
          (type) => (
            <p
              key={type}
              className={`text-center w-full px-4 py-4 rounded-md cursor-pointer ${
                loginType === type
                  ? "bg-[#ffffff] text-primary-light border"
                  : ""
              }`}
              onClick={() => setLoginType(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </p>
          ),
        )}
      </div>
      <div className="space-y-8">
        <div className="space-y-2">
          <label htmlFor="emailOrUsername" className="block text-gray-700">
            Email Address or Username
          </label>
          <input
            id="email"
            name="email"
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
          {errors.emailOrUsername && (
            <span className="text-red-500">
              {errors.emailOrUsername.message}
            </span>
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
        {loginType !== TypeLogin.ADMIN && (
          <div className="text-center text-xl">
            <NavLink
              to={
                loginType === TypeLogin.BUSINESS
                  ? "/business-signUp"
                  : "/individual-signUp"
              }
            >
              {`Don't`} have an account?{" "}
              <span className="font-semibold hover:underline-offset-1">
                Sign up as {loginType}
              </span>
            </NavLink>
          </div>
        )}
      </div>
    </form>
  );
}

export default LoginForm;
