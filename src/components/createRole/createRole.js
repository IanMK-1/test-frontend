import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import { createRoleAsync } from "../../redux/role/create/actions";
import { connect } from "react-redux";
import roleImage from "../../images/roles.svg";

function CreateRole(props) {
  const { createRoleAsync, role } = props;
  const createRoleResponse = role?.createRole?.data;
  const loading = role?.createRole?.loading;

  const formik = useFormik({
    initialValues: {
      roleName: "",
    },
    validationSchema: Yup.object({
      roleName: Yup.string().required("Role name is required."),
    }),
    onSubmit: (values) => {
      const data = {
        name: values.roleName.toLowerCase(),
      };
      createRoleAsync(data);
    },
  });

  useEffect(() => {
    if (createRoleResponse?.data?.name === formik.values.roleName) {
      alert("Role successfully created");
      formik.resetForm();
    }
  }, [createRoleResponse]);

  return (
    <div className="pt-28 ">
      <div className="grid sm:grid-cols-2 mx-auto gap-0 place-items-center sm:w-1/2 w-full h-auto rounded-md p-2 bg-white text-left">
        <div className="sm:block hidden">
          <img src={roleImage} alt="logo" className="w-full h-24" />
          <p className="font-extrabold mt-6 ml-1">TEST APP</p>
        </div>
        <div className="w-full">
          <div className="sm:hidden inline">
            <img src={roleImage} alt="logo" className="w-full h-28" />
            <p className="font-extrabold mt-4 mb-4 text-center">TEST APP</p>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="shadow-md p-4 border rounded"
          >
            <div className="mb-4 text-lg font-bold text-center">
              Create Role
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="roleName"
              >
                Role Name
              </label>
              <input
                className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                id="roleName"
                name="roleName"
                type="text"
                placeholder="Enter name"
                {...formik.getFieldProps("roleName")}
              />
              {formik.touched.roleName && formik.errors.roleName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.roleName}
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
                "Submit"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  const { role } = state;

  return {
    role,
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createRoleAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateRole);
