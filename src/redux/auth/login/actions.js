import { LOGIN_SUCCESS, LOGIN_FAILURE, LOADING, RESET_REDUX } from "./types";
import { LOGIN } from "../../../services/endpoints";
import { setToken } from "../../../utils/token/setToken";
import { API_URL } from "../../../urlPaths/urls";

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  payload: data,
});

const loginFailure = (data) => ({
  type: LOGIN_FAILURE,
  payload: data,
});

const loading = () => ({
  type: LOADING,
});

export const resetRedux = () => ({
  type: RESET_REDUX,
});

export const loginUser = (params) => {
  return (dispatch) => {
    dispatch(loading());
    fetch(`${API_URL}${LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.access) {
          setToken(response.access);
        }
        dispatch(loginSuccess(response));
      })
      .catch((error) => {
        dispatch(loginFailure(error));
      });
  };
};
