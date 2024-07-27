import React from "react";
import OverviewCard from "./OverviewCard";
import PropTypes from "prop-types";
import { useUser } from "../hooks/auth/useUser";

function OverviewStep4({ getValues }) {
  const {user} = useUser();
  let sponsor;
  switch (user?.user_type) {
    case "individual":
      sponsor = user?.profile?.username || user?.profile?.first_name + " " + user?.profile?.last_name   ;
      break;
    case "company":
      sponsor = user?.profile?.company_name;
      break;
    default:
      sponsor = "Admin";
  }
  const data = {
    sponsorAndMembershipInfo: {
      sponsor: sponsor, 
      membership_package: "Individual Package",
      price: "1000",
      commision: "200",
    },
    ContactInfo: {
      first_name: getValues("first_name"),
      last_name: getValues("last_name"),
      email: getValues("email"),
      address: getValues("address"),
      gender: getValues("gender"),
      phone: getValues("phone_no"),
      country: getValues("country"),
      state: getValues("state"),
    },
    loginInfo: {},
  };
  return (
    <div>
      <OverviewCard
        type="sponsorAndMembershipInfo"
        data={data.sponsorAndMembershipInfo}
      />
      <OverviewCard type="ContactInfo" data={data.ContactInfo} />
      <OverviewCard type="loginInfo" data={data.loginInfo} />
    </div>
  );
}
OverviewStep4.propTypes = {
  getValues: PropTypes.func.isRequired,
};

export default OverviewStep4;
