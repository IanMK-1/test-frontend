import {
  REGISTER_LOADING,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  RESET_REGISTER_REDUX,
} from "./types";
import { REGISTER } from "../../../services/endpoints";
import { API_URL } from "../../../urlPaths/urls";
import { getToken } from "../../../utils/token/getToken";

const registerUserSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  payload: data,
});

const registerUserFailure = (error) => ({
  type: REGISTER_FAILURE,
  payload: error,
});

const loading = () => ({
  type: REGISTER_LOADING,
});

export const resetRegisterRedux = () => ({
  type: RESET_REGISTER_REDUX,
});

export const registerUserAsync = (params) => {
  return (dispatch) => {
    const token = getToken();
    dispatch(loading());
    fetch(`${API_URL}${REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(registerUserSuccess(response));
      })
      .catch((error) => {
        dispatch(registerUserFailure(error));
      });
  };
};
