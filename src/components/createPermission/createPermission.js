import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import * as Yup from "yup";
import { useFormik } from "formik";
import permImage from "../../images/permission.svg";
import { connect } from "react-redux";
import { createPermissionAsync } from "../../redux/permission/create/actions";
import { fetchRolesAsync } from "../../redux/role/roles/actions";

function CreatePermission(props) {
  const { createPermissionAsync, permission, role, fetchRolesAsync } = props;
  const createPermissionResponse = permission?.createPermission?.data;
  const loading = permission?.createPermission?.loading;
  const rolesData = role?.roles?.data;

  useEffect(() => {
    fetchRolesAsync();
  }, []);

  useEffect(() => {
    if (createPermissionResponse?.name === formik.values.permissionName) {
      alert("Permission successfully created");
      formik.resetForm();
    }
  }, [createPermissionResponse]);

  const formik = useFormik({
    initialValues: {
      permissionName: "",
      codeName: "",
      roleName: "",
    },
    validationSchema: Yup.object({
      permissionName: Yup.string().required("Permission name is required."),
      codeName: Yup.string().required("Code name is required."),
      roleName: Yup.string().required("Role is required."),
    }),
    onSubmit: (values) => {
      const data = {
        permission_name: values.permissionName.toLowerCase(),
        code_name: values.codeName.toLowerCase(),
        group_name: values.roleName.toLowerCase(),
      };
      createPermissionAsync(data);
    },
  });

  return (
    <div className="pt-28 ">
      <div className="grid sm:grid-cols-2 mx-auto gap-0 place-items-center sm:w-1/2 w-full h-auto rounded-md p-2 bg-white text-left">
        <div className="sm:block hidden">
          <img src={permImage} alt="logo" className="w-full h-24" />
          <p className="font-extrabold mt-6 ml-1">TEST APP</p>
        </div>
        <div className="w-full">
          <div className="sm:hidden inline">
            <img src={permImage} alt="logo" className="w-full h-28" />
            <p className="font-extrabold mt-4 mb-4 text-center">TEST APP</p>
          </div>
          <form
            onSubmit={formik.handleSubmit}
            className="shadow-md p-4 border rounded"
          >
            <div className="mb-4 text-lg font-bold text-center">
              Create Permission
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="permissionName"
              >
                Permission Name
              </label>
              <input
                className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                id="permissionName"
                name="permissionName"
                type="text"
                placeholder="Enter permission name"
                {...formik.getFieldProps("permissionName")}
              />
              {formik.touched.permissionName && formik.errors.permissionName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.permissionName}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="codeName"
              >
                Code Name
              </label>
              <input
                className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300 "
                id="codeName"
                name="codeName"
                type="text"
                placeholder="Enter code name"
                {...formik.getFieldProps("codeName")}
              />
              {formik.touched.codeName && formik.errors.codeName ? (
                <div className="text-red-500 text-sm">
                  {formik.errors.codeName}
                </div>
              ) : null}
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-md font-bold mb-2"
                htmlFor="roleName"
              >
                Role
              </label>
              <select
                className="text-sm appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:border-blue-300"
                {...formik.getFieldProps("roleName")}
                id="roleName"
              >
                {rolesData && rolesData?.length > 0 && rolesData?.map((role) => {
                  return (
                    <option key={role.id} value={role.name}>
                      {role.name}
                    </option>
                  );
                })}
              </select>
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
  const { permission, role } = state;

  return {
    permission,
    role
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createPermissionAsync, fetchRolesAsync }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePermission);
