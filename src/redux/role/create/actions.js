import {
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  CREATE_ROLE_LOADING,
} from "./types";
import { CREATE_ROLE } from "../../../services/endpoints";
import { getToken } from "../../../utils/token/getToken";
import { API_URL } from "../../../urlPaths/urls";

const createRoleSuccess = (data) => ({
  type: CREATE_ROLE_SUCCESS,
  payload: data,
});

const createRoleFailure = (error) => ({
  type: CREATE_ROLE_FAILURE,
  payload: error,
});

const loading = () => ({
  type: CREATE_ROLE_LOADING,
});

export const createRoleAsync = (data) => {
  return (dispatch) => {
    const token = getToken();
    dispatch(loading());
    fetch(`${API_URL}${CREATE_ROLE}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(createRoleSuccess(response));
      })
      .catch((error) => {
        dispatch(createRoleFailure(error));
      });
  };
};
