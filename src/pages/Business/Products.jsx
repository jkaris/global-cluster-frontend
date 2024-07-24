import React, { useContext, useEffect, useState } from "react";
// import { useLoaderData } from "react-router-dom";
import { ModalContext } from "./../../App";

import ActionNotification from "../../components/ActionNotification";
import AddProduct from "../../components/AddProduct";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Pagination from "../../components/Pagination";
import Filter from "../../components/ui/Filter";
import BusinessDashboardHeader from "../../components/ui/Header";
import PageDataHeader from "../../components/ui/PageDataHeader";
import ProductsTicket from "../../components/ui/ProductTickets";
import TableData from "../../components/ui/TableData";

// import { addProduct, BASE_URL, fetchProducts } from "../../services/api";
import {
  useAddProductMutation,
  useDeleteProductMutation,
  useProductMutation,
  useProductsQuery,
} from "../../features/product/productApiSlice";
import { itemsPerPage } from "../../lib/constants";

const initialProductsData = [
  // Your initial products data
];

function Products() {
  const { showModal, setShowModal } = useContext(ModalContext);
  const [showAction, setShowAction] = useState(false);

  // const fetchedProductsData = useLoaderData();
  // const [productsData, setProductsData] = useState(
  //   fetchedProductsData.length ? fetchedProductsData : initialProductsData
  // );
  const [productsData, setProductsData] = useState(initialProductsData);
  const [currentPage, setCurrentPage] = useState(1);
  const { data: productsQuery } = useProductsQuery({
    pollingInterval: 3000,
    refetchOnMountOrArgChange: true,
    skip: false,
  });

  const [product] = useProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [addProduct] = useAddProductMutation();
  async function addNewProduct(formData) {
    try {
      const response = await addProduct(formData).unwrap();
      setProductsData([...productsData, response]);
      setShowModal(false);
      showTemporaryNotification();
    } catch (error) {
      throw new Error("Failed to add new product");
      // if (error.response) {
      //   // Server errors (status code outside of 2xx range)
      //   console.error("Server Error:", JSON.stringify(error.response));
      // } else if (error.request) {
      //   // Network errors or no response from server
      //   console.error("Network Error:", error.message);
      // } else {
      //   // Other errors
      //   console.error("Error Adding New Product:", error.message);
      // }
    }
  }

  async function handleDelete(productId) {
    try {
      const response = await deleteProduct(productId).unwrap();
      const updatedProducts = productsData.filter(
        (product) => product.id !== productId
      );
      setProductsData(updatedProducts);
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
  }

  async function handleShowProductDetails(productId) {
    console.log(productId);

    try {
      const response = await product(productId);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const productData = await response.json();

      return productData;
    } catch (error) {
      console.error("Failed to fetch that product:", error.message);
    }
  }

  function showTemporaryNotification() {
    setShowAction(true);
    setTimeout(() => {
      setShowAction(false);
    }, 2000);
  }

  useEffect(() => {
    if (productsQuery) {
      setProductsData(productsQuery.products); // Assuming the data has a 'products' property
    }
  }, [productsQuery]);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentProducts = productsData.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col gap-8 bg-gray-50">
      <BusinessDashboardHeader />
      <main className="m-10 shadow-[0_0_10px_rgba(0,0,0,0.1)] rounded-md bg-white">
        <div className="py-20 px-20 flex flex-col gap-10">
          <div className="flex justify-between items-center">
            <PageDataHeader name="Products" to="products" />
            <Button
              onClick={() => setShowModal(!showModal)}
              btnText="Add New Product"
            />
          </div>

          {showModal && (
            <Modal>
              <AddProduct
                addNewProduct={addNewProduct}
                CloseModalWindow={setShowModal}
                currentStatus={showModal}
              />
            </Modal>
          )}

          {showAction && (
            <Modal>
              <ActionNotification message="Product Added Successfully" />
            </Modal>
          )}

          <ProductsTicket />

          <section className="flex flex-col gap-6">
            <Filter />
            <div className="flex flex-col gap-10">
              <TableData
                data={currentProducts}
                tableHeadNames={[
                  "Product Name",
                  "Description",
                  "No of Shares",
                  "Traffic",
                  "Status",
                  "Action",
                ]}
                onDelete={(index) =>
                  handleDelete(productsData[startIndex + index].id)
                }
                handleShowProductDetails={handleShowProductDetails}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(productsData.length / itemsPerPage)}
                onPageChange={handlePageChange}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

// export async function loader() {
//   const productsData = await fetchProducts(); // Assuming this function fetches all products from backend
//   return productsData;
// }

export default Products;
