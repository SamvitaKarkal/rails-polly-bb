import React from "react";
import NavItem from "./NavItem";
import authApi from "apis/auth";
//import { isNil, isEmpty, either } from "ramda";
import { resetAuthTokens } from "src/apis/axios.js";
import { getFromLocalStorage, setToLocalStorage } from "helpers/storage";
import { Link } from "react-router-dom";

//const NavBar = () => {
const NavBar = ({ isLoggedIn }) => {
  const userName = getFromLocalStorage("authUserName");
  //const authToken = getFromLocalStorage("authToken");
  //const isLoggedIn = !either(isNil, isEmpty)(authToken);

  const handleLogout = async () => {
    try {
      await authApi.logout();
      setToLocalStorage({
        authToken: null,
        email: null,
        userId: null,
        userName: null,
      });
      resetAuthTokens();
      window.location.href = "/";
    } catch (error) {
      logger.error(error);
    }
  };

  return (
    <nav className="bg-white shadow">
      <div className="container px-2 mx-auto max-w-7xl sm:px-4 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex px-2 lg:px-0">
            <div className="hidden lg:flex">
              <NavItem name="Polly" path="/" />
            </div>
          </div>
          {isLoggedIn ? (
            <div className="flex items-center justify-end">
              <span
                className="inline-flex items-center px-2 pt-1 text-lg
              font-regular leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2 
              border-transparent focus:outline-none
              focus:text-bb-gray-900"
              >
                {userName}
              </span>
              <a
                onClick={handleLogout}
                className="inline-flex items-center px-1 pt-1 text-lg
              font-semibold leading-5 text-bb-gray-600 text-opacity-50
              transition duration-150 ease-in-out border-b-2
              border-transparent hover:text-bb-gray-600 focus:outline-none
              focus:text-bb-gray-700 cursor-pointer"
              >
                LogOut
              </a>
            </div>
          ) : (
            <div className="flex items-center justify-end gap-x-4">
              <Link
                to="/login"
                className="inline-flex items-center px-1 pt-1 text-sm
            font-semibold leading-5 text-bb-gray-600 text-opacity-50
            transition duration-150 ease-in-out border-b-2
            border-transparent hover:text-bb-gray-600 focus:outline-none
            focus:text-bb-gray-700 cursor-pointer text-xl"
              >
                LogIn
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
