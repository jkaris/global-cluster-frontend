import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminSidebar from "./../components/AdminSidebar";
import { useUser } from "../hooks/auth/useUser";
import { useProfileMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";
import { profileAction } from "../features/auth/authSlice";

function AdminLayout() {
  const { user, isAuthenticated } = useUser();
  const isAdmin = user?.user_type === "admin";
  const navigate = useNavigate();
  const [profile] = useProfileMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    // Fetch user profile when the component mounts
    const fetchUserProfile = async () => {
      try {
        const response = await profile(user?.user_id).unwrap();
        dispatch(profileAction(response));
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
    fetchUserProfile();
  }, []);
  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate("/login");
    }
  }, [isAuthenticated, isAdmin, navigate]);

  if (!isAuthenticated || !isAdmin) {
    return null; // Prevent rendering the children if the user is not authenticated or not an admin
  }

  return (
    <div className="flex">
      <div className="bg-primary w-[48rem] flex flex-col min-h-screen">
        <AdminSidebar style={{ color: "#1F2937", fontSize: "1.5rem" }} />
      </div>
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
