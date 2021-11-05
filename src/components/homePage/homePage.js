import React from "react";
import { Link } from "react-router-dom";
import { paths } from "../../urlPaths";
import { getUserInfo } from "../../utils/token/getUserInfo";

function HomePage() {
  let userInfo = getUserInfo();

  return (
    <div>
      {userInfo.roles.admin && (
        <div className="grid grid-cols-1 md:grid-cols-3">
          <div className="bg-white text-base rounded-lg shadow w-full md:w-2/3 mx-auto -brown-400 border border-t-8 border-b-8 border-black mt-20 flex flex-col">
            <div className="p-4 flex flex-col">
              <p className="my-4">
                Admin has the right to register users. Click on the link below
                to do so.
              </p>
              <Link to={paths.register}>
                <button
                  type="button"
                  className="hover:text-white hover:bg-green-400 bg-yellow-400 text-gray-500 my-4 px-6 py-2 text-lg rounded shadow-px-4 border-0"
                >
                  Register User
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-white text-base rounded-lg shadow w-full md:w-2/3 mx-auto -brown-400 border border-t-8 border-b-8 border-black mt-20 flex flex-col">
            <div className="p-4 flex flex-col">
              <p className="my-4">
                Admin has the right to create roles. Click on the link below to
                do so.
              </p>
              <Link to={paths.createRole}>
                <button
                  type="button"
                  className="hover:text-white hover:bg-green-400 bg-yellow-400 text-gray-500 my-4 px-6 py-2 text-lg rounded shadow-px-4 border-0"
                >
                  Create Role
                </button>
              </Link>
            </div>
          </div>
          <div className="bg-white text-base rounded-lg shadow w-full md:w-2/3 mx-auto -brown-400 border border-t-8 border-b-8 border-black mt-20 flex flex-col">
            <div className="p-4 flex flex-col">
              <p className="my-4">
                Admin has the right to create permissions. Click on the link
                below to do so.
              </p>
              <Link to={paths.createPermission}>
                <button
                  type="button"
                  className="hover:text-white hover:bg-green-400 bg-yellow-400 text-gray-500 m-auto my-4 px-6 py-2 text-lg rounded shadow-px-4 border-0"
                >
                  Create Permission
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
      {userInfo.roles.staff && (
        <div className="bg-white text-base w-full md:w-2/3 mx-auto rounded-lg shadow m-auto -brown-400 border border-t-8 border-b-8 border-black mt-20 flex flex-col">
          <div className="p-4 flex flex-col">
            <p className="my-4">
              Welcome to Test App. You have successfully logged in as a staff
              member.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;
