import React, { useEffect, useState } from 'react';
import Filter from './../components/ui/Filter';
import TicketCard from './../components/ui/TicketCard';
import UserDataTale from './../components/UserDataTable';
import { useMembersMutation } from '../features/user/userApiSlice';

function MemberDownline() {
  const [fetchedMembers,setFetchedMembers] = useState([]);
  const [members] = useMembersMutation()
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await members().unwrap();
        setFetchedMembers(response);
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
    fetchMembers();
  }, [members ]);
  return (
    <div className="px-6 py-10 flex flex-col gap-8">
      <section className="bg-gray-50 rounded-lg flex gap-6">
        <TicketCard name="Total Downline Members" numbers={520} />
        <TicketCard name="Total Levels" numbers={4} />
        <TicketCard name="Paired" numbers={4} />
        <TicketCard name="Unpaired" numbers={16} />
      </section>
      <section className="flex flex-col gap-6">
        <Filter data={fetchedMembers} setDataFunction={setFetchedMembers} showDownload={true} />
        <div className="flex flex-col gap-10">
          <UserDataTale
            type="downlineUser"
            data={fetchedMembers}
            tableHeadNames={[
              'Member',
              'Username',
              'Placement',
              'Referee',
              'Level',
            ]}
          />
        </div>
      </section>
    </div>
  );
}

export default MemberDownline;
