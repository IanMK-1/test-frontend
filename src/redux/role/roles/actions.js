import {
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  FETCH_ROLES_LOADING,
} from "./types";
import { ROLES } from "../../../services/endpoints";
import { getToken } from "../../../utils/token/getToken";
import { API_URL } from "../../../urlPaths/urls";

const fetchRolesSuccess = (data) => ({
  type: FETCH_ROLES_SUCCESS,
  payload: data,
});

const fetchRolesError = (error) => ({
  type: FETCH_ROLES_FAILURE,
  payload: error,
});

const loading = () => ({
  type: FETCH_ROLES_LOADING,
});

export const fetchRolesAsync = () => {
  return (dispatch) => {
    const token = getToken();
    dispatch(loading());
    fetch(`${API_URL}${ROLES}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(fetchRolesSuccess(response));
      })
      .catch((error) => {
        dispatch(fetchRolesError(error));
      });
  };
};
