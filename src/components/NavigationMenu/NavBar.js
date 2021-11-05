import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserInfo } from "../../utils/token/getUserInfo";
import { removeToken } from "../../utils/token/removeToken";
import { getToken } from "../../utils/token/getToken";
import { Link } from "react-router-dom";
import { paths } from "../../urlPaths";

function NavBar() {
  const [showDropdown, setShowdropdown] = useState(false);
  const userInfo = getUserInfo();

  let token = getToken();
  const navigate = useNavigate();

  function toggleDropdown() {
    setShowdropdown(!showDropdown);
  }

  function closeDropdown() {
    setShowdropdown(false);
  }

  const logout = () => {
    if (token) {
      removeToken();
      navigate("/login");
    }
  };

  return (
    <div
      style={{ backgroundColor: "#355070" }}
      className="flex w-full mb-2 p-3"
    >
      <div className="text-2xl hidden sm:block font-extrabold text-white my-auto">
        Test App
      </div>
      <div className="flex ml-auto">
      <Link to={paths.home} className="flex text-white my-auto hover:text-yellow-300">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-6 mr-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span className="text-sm sm:text-md text-center font-extrabold">
          Home
        </span>
      </Link>
      <div className="border-r border mx-1 sm:mx-5"></div>
      <div className="relative cursor-pointer">
        <div
          className="flex hover:text-yellow-300 text-white"
          onClick={toggleDropdown}
        >
          <span className="text-sm sm:text-md  text-center font-extrabold my-auto">
            Hi, {userInfo?.username}.
          </span>
          <svg
            className="h-9 w-6 "
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        {showDropdown ? (
          <div>
            <div
              onClick={closeDropdown}
              className="fixed inset-0 h-full w-full z-10"
            ></div>
            <div
              className="origin-top-right absolute z-20 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex="-1"
            >
              <div className="py-1" role="none">
                <div
                  onClick={logout}
                  className="text-center px-4 py-2 cursor-pointer text-sm font-bold bg-yellow-200 hover:bg-yellow-400"
                >
                  <span className="my-auto">Logout</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
      </div>
    </div>
  );
}

export default NavBar;
