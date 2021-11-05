import {
  CREATE_PERMISSION_SUCCESS,
  CREATE_PERMISSION_FAILURE,
  CREATE_PERMISSION_LOADING,
} from "./types";
import { CREATE_PERMISSION } from "../../../services/endpoints";
import { API_URL } from "../../../urlPaths/urls";
import { getToken } from "../../../utils/token/getToken";

const createPermissionSuccess = (data) => ({
  type: CREATE_PERMISSION_SUCCESS,
  payload: data,
});

const createPermissionFailure = (error) => ({
  type: CREATE_PERMISSION_FAILURE,
  payload: error,
});

const loading = () => ({
  type: CREATE_PERMISSION_LOADING,
});

export const createPermissionAsync = (data) => {
  return (dispatch) => {
    const token = getToken();
    dispatch(loading());
    fetch(`${API_URL}${CREATE_PERMISSION}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(createPermissionSuccess(response));
      })
      .catch((error) => {
        dispatch(createPermissionFailure(error));
      });
  };
};
