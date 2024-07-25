import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BusinesSidebar from "../components/BusinesSidebar";
import { useUser } from "../hooks/auth/useUser";
import { profileAction } from "../features/auth/authSlice";
import { useProfileMutation } from "../features/auth/authApiSlice";
import { useDispatch } from "react-redux";

function BusinessLayout() {
  const { user, isAuthenticated } = useUser();
  const isBusiness = user?.user_type === "company";
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
    if (!isAuthenticated || !isBusiness) {
      navigate("/login");
    }
  }, [isAuthenticated, isBusiness, navigate]);

  if (!isAuthenticated || !isBusiness) {
    return null; // Prevent rendering the children if the user is not authenticated or not an admin
  }
  
  return (
    <div className="flex">
      <div className="bg-primary w-[22%] flex flex-col min-h-screen">
        <BusinesSidebar style={{ color: "#1F2937", fontSize: "1.5rem" }} />
      </div>

      <main className="w-full">
        <Outlet />
      </main>
    </div>
  );
}

export default BusinessLayout;
