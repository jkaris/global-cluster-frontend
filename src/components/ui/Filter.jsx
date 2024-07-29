// import React from 'react';
// import HeaderSearch from './../../components/HeaderSearch';
// import { IoFilterSharp } from 'react-icons/io5';

// function Filter() {
//   return (
//     <section className="flex justify-between items-center ">
//       <div className=" flex gap-8">
//         <div className="border rounded-md">
//           <HeaderSearch placeholder="Search for an entry" />
//         </div>
//         <div className="flex gap-6 items-center py-3 px-12 justify-center rounded-md font-bold border">
//           <IoFilterSharp style={{ fontSize: '2rem' }} /> <p>Filter</p>
//         </div>
//       </div>
//       <div className="flex gap-6 items-center py-4 px-10 justify-center border font-bold rounded-md">
//         <IoFilterSharp style={{ fontSize: '2rem' }} /> <p>Download</p>
//       </div>
//     </section>
//   );
// }

// export default Filter;

import React, { useState } from "react";
import PropTypes from "prop-types";
import HeaderSearch from "./../../components/HeaderSearch";
import { IoFilterSharp } from "react-icons/io5";
import { saveAs } from "file-saver";
import Papa from "papaparse";

function Filter({
  data = [],
  setDataFunction = () => {},
  showDownload = true,
}) {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const regex = new RegExp(value, "i");
    const filteredData = data.filter((item) =>
      Object.values(item).some((val) => regex.test(val)),
    );
    // console.log("called with filteredData: ", filteredData);
    setDataFunction(filteredData);
  };

  const handleDownload = () => {
    if (data.length > 0) {
      const csv = Papa.unparse(data);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, "data.csv");
    }
  };

  return (
    <section className="flex justify-between items-center">
      <div className="flex gap-8">
        <div className="border rounded-md">
          <HeaderSearch
            placeholder="Search for an entry"
            onChange={handleSearch}
            value={searchTerm}
          />
        </div>
        <div className="flex gap-6 items-center py-3 px-12 justify-center rounded-md font-bold border">
          <IoFilterSharp style={{ fontSize: "2rem" }} /> <p>Filter</p>
        </div>
      </div>
      {showDownload && (
        <div
          className="flex gap-6 items-center py-4 px-10 justify-center border font-bold rounded-md cursor-pointer"
          onClick={handleDownload}
        >
          <IoFilterSharp style={{ fontSize: "2rem" }} /> <p>Download</p>
        </div>
      )}
    </section>
  );
}

Filter.propTypes = {
  data: PropTypes.array,
  setDataFunction: PropTypes.func,
  showDownload: PropTypes.bool,
};

export default Filter;
