import React, { useEffect, useState } from 'react';
import PromoteAndEarnRowTable from '../../components/PromoteAndEarnRowTable';
import Filter from '../../components/ui/Filter';
import BusinessDashboardHeader from '../../components/ui/Header';
import PageDataHeader from '../../components/ui/PageDataHeader';
import TicketCard from '../../components/ui/TicketCard';
import { useProductsMutation } from '../../features/product/productApiSlice';

const products = [
  {
    name: 'Lorem ipsum',
    company: 'Global Cluster',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.....',
    date: '1 Jan 2024',
  },
  {
    name: 'Lorem ipsum',
    company: 'Global Cluster',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.....',
    date: '1 Jan 2024',
  },
  {
    name: 'Lorem ipsum',
    company: 'Global Cluster',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.....',
    date: '1 Jan 2024',
  },
  {
    name: 'Lorem ipsum',
    company: 'Global Cluster',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.....',
    date: '1 Jan 2024',
  },
  {
    name: 'Lorem ipsum',
    company: 'Global Cluster',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.....',
    date: '1 Jan 2024',
  },
  {
    name: 'Lorem ipsum',
    company: 'Global Cluster',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.....',
    date: '1 Jan 2024',
  },
  {
    name: 'Lorem ipsum',
    company: 'Global Cluster',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing.....',
    date: '1 Jan 2024',
  },
  // Add more product objects as needed
];

function PermoteAndEarn() {

  const [products] = useProductsMutation();
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      try {
        const response = await products().unwrap();

        setProductsData(response);
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
    fetchedProducts();
  }, []);
  const totalShare = productsData.reduce(
    (sum, product) => sum + (product.shares || 0),
    0
  );
  const earnedBonus = 245
  return (
    <div className="bg-gray-50">
      <BusinessDashboardHeader />
      <main className="mx-10 my-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
        <section className="px-10 py-10">
          <PageDataHeader name="Promote & Earn" />
        </section>
        <section className=" p-10  bg-gray-50  rounded-xl m-20 flex gap-8">
          <TicketCard name="No of Links Shared" numbers={totalShare} />
          <TicketCard name="Bonus Earned" numbers={earnedBonus} />
        </section>
        <section className="p-10 ">
          <div className="p-8 flex flex-col gap-10">
            <Filter />
          </div>
          <div>
            <PromoteAndEarnRowTable products={productsData} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default PermoteAndEarn;
