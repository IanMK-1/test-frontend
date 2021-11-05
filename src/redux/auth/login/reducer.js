import { produce } from "immer";
import { LOGIN_FAILURE, LOGIN_SUCCESS, LOADING, RESET_REDUX } from "./types";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

const loginReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return produce(state, (draftState) => {
        draftState.data = payload;
        draftState.loading = false;
      });
    case LOGIN_FAILURE:
      return produce(state, (draftState) => {
        draftState.error = payload;
        draftState.loading = false;
      });
    case LOADING:
      return produce(state, (draftState) => {
        draftState.loading = true;
      });
    case RESET_REDUX:
      return produce(state, (draftState) => {
        draftState = initialState;
      });
    default:
      return state;
  }
};

export default loginReducer;
