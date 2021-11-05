import React from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { loginUser } from "../../redux/auth/login/actions";
import { checkTokenValidity } from "../../utils/token/validateToken";
import { useFormik } from "formik";
import { paths } from "../../urlPaths";
import loginImage from "../../images/logo.svg";

function Login(props) {
  const { loginUser, login } = props;
  const loading = login?.loading;
  const incorrectCredentials = login?.data?.detail;
  const isTokenValidated = checkTokenValidity();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required."),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      if (values.username && values.password) {
        const data = {
          username: values.username,
          password: values.password,
        };
        loginUser(data);
      }
    },
  });

  return (
    <div>
      {isTokenValidated ? (
        <Navigate to={paths.home} />
      ) : (
        <div className="pt-28 ">
          <div className="grid sm:grid-cols-2 mx-auto gap-0 place-items-center sm:w-1/2 w-full h-auto rounded-md p-2 bg-white text-left">
            <div className="sm:block hidden">
              <img src={loginImage} alt="logo" className="w-full h-24" />
              <p className="font-extrabold mt-6 ml-1">TEST APP</p>
            </div>
            <div className="w-full">
              <div className="sm:hidden inline">
                <img src={loginImage} alt="logo" className="w-full h-28" />
                <p className="font-extrabold mt-4 mb-4 text-center">TEST APP</p>
              </div>
              <form
                onSubmit={formik.handleSubmit}
                className="shadow-md p-4 border rounded"
              >
                {incorrectCredentials ? (
                  <div className="mb-4 text-red-500 border border-red-300 p-2 text-sm">
                    Incorrect username or password
                  </div>
                ) : null}
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2"
                    htmlFor="username"
                  >
                    username
                  </label>
                  <input
                    className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                    id="username"
                    name="username"
                    type="text"
                    placeholder="username"
                    {...formik.getFieldProps("username")}
                  />
                  {formik.touched.username && formik.errors.username ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.username}
                    </div>
                  ) : null}
                </div>
                <div className="mb-6">
                  <label
                    className="block text-gray-700 text-md font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                    id="password"
                    name="password"
                    type="password"
                    placeholder="****"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500 text-sm">
                      {formik.errors.password}
                    </div>
                  ) : null}
                </div>
                <button
                  className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex justify-center">
                      <svg
                        className="animate-spin mr-3 h-6 w-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      Loading
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  const { login } = state;

  return {
    login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    {
      loginUser,
    },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
