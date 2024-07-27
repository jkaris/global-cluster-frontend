import React, { useEffect, useState } from "react";
import RankingCupImg from "./../assets/images/cup.jpeg";
import { useUser } from "../hooks/auth/useUser";
import { useRankingMutation } from "../features/user/userApiSlice";

function Ranking() {
  const { user } = useUser();
  // console.log(user)
  const [ranking] = useRankingMutation()
  const [rankingData, setRankingData] = useState({
    ranking: "Field Marsha",
    cup: RankingCupImg,
  });

  useEffect(() => {
    const fetchRanking = async () => {
      try {
        const response = await ranking(user?.user_id).unwrap();
        setRankingData(response);
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
    fetchRanking();
  }, [ranking]);
  return (
    <div className="">
      <p className="font-semibold border-b pb-2">Ranking</p>
      <div className=" flex flex-col py-10 mt-10 w-full h-full justify-center gap-4 items-center">
        <img className="w-1/4" src={rankingData.cup} alt="Ranking in the contest" />
        <div className="flex items-center justify-center flex-col gap-2">
          <p className="text-4xl font-bold">{rankingData.title}</p>
          <p className="text-gray-400">Current Ranking</p>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
