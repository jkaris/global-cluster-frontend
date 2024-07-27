import React, { useEffect, useState } from "react";
import RowData from "./RowData";
import UserImg from "./../assets/images/userImg.png";
import { GoArrowRight } from "react-icons/go";
import { useGetUsersMutation } from "../features/user/userApiSlice";

function TeamPerformance() {
  const [activeTab, setActiveTab] = useState("earners"); // State to track active tab

  const [topEarners, setTopEarners] = useState([]);
  const [topRecruiters, setTopRecruiters] = useState([]);
  const [getUsers] = useGetUsersMutation();
  useEffect(() => {
    const fetchEarners = async () => {
      try {
        const response = await getUsers().unwrap();
        setTopEarners(response); // only top 3 with highest recruitw
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
    const fetchRecruiters = async () => {
      try {
        const response = await getUsers().unwrap();
        setTopRecruiters(response); // only top 3 with highest recruitw
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
    if (activeTab === "earners") {
      fetchEarners();
    } else {
      fetchRecruiters();
    }
  }, [activeTab]);
  return (
    <div className="flex flex-col gap-8">
      <p className="font-semibold">Team Performance</p>
      <div className="border-b flex gap-6 p-2">
        <p
          className={`text-2xl cursor-pointer ${
            activeTab === "earners"
              ? "bg-primary-light text-white rounded-lg px-2"
              : ""
          }`}
          onClick={() => setActiveTab("earners")}
        >
          Top Earners
        </p>
        <p
          className={`text-2xl cursor-pointer ${
            activeTab === "recruiters"
              ? "bg-primary-light text-white rounded-lg px-2"
              : ""
          }`}
          onClick={() => setActiveTab("recruiters")}
        >
          Top Recruiters
        </p>
      </div>

      {activeTab === "earners" && (
        <div className="flex flex-col gap-8">
          {topEarners.map((earner, index) => (
            <RowData
              key={index}
              memberName={earner.memberName}
              userName={earner.username}
              img={UserImg}
            >
              <p className="px-6 font-bold text-primary-dark mb-4">
                {earner.amount}
              </p>
            </RowData>
          ))}
        </div>
      )}

      {activeTab === "recruiters" && (
        <div className="flex flex-col gap-8">
          {topRecruiters.map((recruiter, index) => (
            <RowData
              key={index}
              memberName={recruiter.memberName}
              userName={recruiter.userName}
              img={UserImg}
            >
              <p className="px-6 font-bold text-white rounded-lg bg-primary-light mb-4">
                {recruiter.recruits} Recruits
              </p>
            </RowData>
          ))}
        </div>
      )}

      <div className="flex gap-4 p-8 text-2xl items-center justify-center font-bold text-primary-light cursor-pointer">
        <GoArrowRight />
        <p>View All</p>
      </div>
    </div>
  );
}

export default TeamPerformance;
