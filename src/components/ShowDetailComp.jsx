import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { ImCancelCircle } from "react-icons/im";
import ProductDetailImage from "./../assets/images/detailsImg.jpeg";
import { imageUrl } from "../lib/utils";
// import { useProductMutation } from "../features/product/productApiSlice";

function ShowDetailComp({ detail, setShowDetail, type }) {
  // const [product] = useProductMutation();

  // useEffect(() => {
  //   if (type === "product") {
  //     const updateTraffic = async () => {
  //       try {
  //         const response = await product(detail.uuid);
  //       } catch (error) {
  //         if (error.response) {
  //           // Server errors (status code outside of 2xx range)
  //           console.error("Server Error:", JSON.stringify(error.response));
  //         } else if (error.request) {
  //           // Network errors or no response from server
  //           console.error("Network Error:", error.message);
  //         } else {
  //           // Other errors
  //           console.error("Error:", error.message);
  //         }
  //       }
  //     };
  //     updateTraffic();
  //   }
  // }, []);

  if (type === "user") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-gray-500">
        <div className="w-[60rem] font-thin flex flex-col gap-2 bg-gray-100 border overflow-hidden rounded-xl">
          <div className="flex justify-between items-center px-8 py-5 bg-white rounded-xl">
            <h2 className="font-semibold text-2xl">User Details</h2>
            <ImCancelCircle
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={() => setShowDetail(false)}
            />
          </div>

          <div className="p-10 flex flex-col gap-20">
            <div className="flex flex-wrap gap-10">
              <div className="flex-1">
                <p>First Name</p>
                <p className="font-bold">{detail?.first_name}</p>
              </div>
              <div className="flex-1">
                <p>Last Name</p>
                <p className="font-bold">{detail?.last_name}</p>
              </div>
              <div className="flex-1">
                <p>Email Address</p>
                <p className="font-bold">{detail.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-10">
              <div className="flex-1">
                <p>Phone</p>
                <p className="font-bold">{detail.phone_number}</p>
              </div>
              <div className="flex-1">
                <p>Address</p>
                <p className="font-bold">{detail.address}</p>
              </div>
              <div className="flex-1">
                <p>State</p>
                <p className="font-bold">{detail.state}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 text-gray-500">
        <div className="w-[60rem] font-thin flex flex-col gap-2 bg-gray-100 border overflow-hidden rounded-xl">
          <div className="flex justify-between items-center px-8 py-5 bg-white rounded-xl">
            <h2 className="font-semibold text-2xl">Product Details</h2>
            <ImCancelCircle
              style={{ fontSize: "2rem", cursor: "pointer" }}
              onClick={() => setShowDetail(false)}
            />
          </div>
          <div className="mx-10 my-7 p-8 bg-white flex flex-col gap-6 rounded-xl">
            <div className="border-b pb-3">Product Images</div>
            <div>
              <img
                className="w-2/6"
                src={
                  detail.product_image
                    ? imageUrl(detail.product_image)
                    : ProductDetailImage
                }
                alt="Product details images for show"
              />
            </div>

            <div className="border-b p-3">Product Details</div>
            <div className="p-4 flex items-center justify-between">
              <div>
                <p>Product Name</p>
                <p className="font-bold">{detail.product_name}</p>
              </div>
              <div>
                <p>Status</p>
                <p className="font-bold ">{detail.status}</p>
              </div>
              <div>
                <p>{detail.product_link}</p>
                <p className="font-bold">{detail.product_value}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4 p-4">
              <p>PRODUCT DESCRIPTION</p>
              <p>{detail.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ShowDetailComp.propTypes = {
  detail: PropTypes.object,
  setShowDetail: PropTypes.func,
  type: PropTypes.string,
};

export default ShowDetailComp;
