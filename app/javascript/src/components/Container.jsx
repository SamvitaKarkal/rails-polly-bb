import React from "react";
//import NavBar from "components/NavBar";

import PropTypes from "prop-types";
const Container = ({ children }) => {
  return (
    <>
      {/* <NavBar/> */}
      <div className="px-4 py-2 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-bb-sky min-h-full">
        <div className="max-w-xl mx-auto bg-white mt-8 p-10 shadow-md">
          {children}
        </div>
      </div>
    </>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
