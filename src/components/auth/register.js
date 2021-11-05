import React, { useEffect, useState } from "react";
import {
  registerUserAsync,
  resetRegisterRedux,
} from "../../redux/auth/register/actions";
import loginImage from "../../images/logo.svg";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { fetchRolesAsync } from "../../redux/role/roles/actions";

function Register(props) {
  const {
    registerUserAsync,
    resetRegisterRedux,
    register,
    fetchRolesAsync,
    role,
  } = props;
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [userExists, setUserExists] = useState(false);

  const loadingRegisterUser = register?.loading;
  const registerUserData = register?.data?.user;
  const loading = loadingRegisterUser;
  const rolesData = role?.roles?.data;

  useEffect(() => {
    fetchRolesAsync();
  }, []);

  useEffect(() => {
    if (register?.data?.username?.[0] || register?.data?.email?.[0]) {
      setUserExists(true);
    } else {
      setUserExists(false);
    }
  }, [register?.data?.username, register?.data?.email]);

  const formik = useFormik({
    initialValues: {
      username: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      roles: [],
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      firstName: Yup.string().required("First name is required"),
      lastName: Yup.string().required("Last name is required"),
      email: Yup.string().required("Email is required"),
      password: Yup.string()
        .required("Password is required")
        .test(
          "testLength",
          "Password should contain minimum 8 characters, with at least a symbol, upper and lower case letters and a number",
          function (value) {
            let re = /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(value);
          }
        ),
      password2: Yup.string()
        .required("Password is required")
        .test(
          "testLength",
          "Password should contain minimum 8 characters, with at least a symbol, upper and lower case letters and a number",
          function (value) {
            let re = /^(?=.*\d)(?=.*[!@#$%^&*?])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            return re.test(value);
          }
        ),
      roles: Yup.array().of(Yup.string()).min(1).required("Required"),
    }),
    onSubmit: (values) => {
      if (values.password !== values.password2) {
        setPasswordMatch(false);
      } else {
        const data = {
          username: values.username,
          first_name: values.firstName,
          last_name: values.lastName,
          email: values.email,
          password: values.password,
          password2: values.password2,
          groups: values.roles,
        };
        registerUserAsync(data);
      }
    },
  });

  useEffect(() => {
    if (registerUserData) {
      alert("User successfully registered!!");
      formik.resetForm();
      resetRegisterRedux();
    }
  }, [registerUserData]);

  return (
    <div className="pt-14 ">
      <div className="grid sm:grid-cols-2 mx-auto gap-0 place-items-center sm:w-3/4 w-full h-auto rounded-md p-2 bg-white text-left">
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
            {userExists ? (
              <div className="mb-4 text-red-500 border border-red-300 p-2 text-sm">
                User with Username or Email exists.
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
            <div className="mb-4 grid sm:grid-cols-2 grid-cols-1 gap-2">
              <div>
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  {...formik.getFieldProps("firstName")}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.firstName}
                  </div>
                ) : null}
              </div>
              <div>
                <label
                  className="block text-gray-700 text-md font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  {...formik.getFieldProps("lastName")}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.lastName}
                  </div>
                ) : null}
              </div>
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                id="email"
                name="email"
                type="email"
                placeholder="Email"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="roles"
              >
                Roles
              </label>
              <select
                className="form-multiselect text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                multiple
                {...formik.getFieldProps("roles")}
                id="roles"
              >
                {rolesData && rolesData?.length > 0 && rolesData?.map((role) => {
                  return (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  );
                })}
              </select>
              {formik.touched.roles && formik.errors.roles ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.roles}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
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
            <div className={`${!passwordMatch ? "mb-4" : "mb-6"}`}>
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="password2"
              >
                Re-type Password
              </label>
              <input
                className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                id="password2"
                name="password2"
                type="password"
                placeholder="****"
                {...formik.getFieldProps("password2")}
              />
              {formik.touched.password2 && formik.errors.password2 ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.password2}
                </div>
              ) : null}
            </div>
            {!passwordMatch ? (
              <div className="mb-6 text-red-500 border border-red-300 p-2 text-sm">
                Passwords do not match.
              </div>
            ) : null}
            <button
              className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                "Sign Up"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { register, role } = state;

  return {
    register,
    role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { registerUserAsync, resetRegisterRedux, fetchRolesAsync },
    dispatch
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
