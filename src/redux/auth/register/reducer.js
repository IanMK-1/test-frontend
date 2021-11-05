import produce from "immer";
import {
  RESET_REGISTER_REDUX,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_LOADING,
} from "./types";

const initialState = {
  data: {},
  error: null,
  loading: false,
};

const registerReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case REGISTER_SUCCESS:
      return produce(state, (draftState) => {
        draftState.data = payload;
        draftState.loading = false;
      });
    case REGISTER_FAILURE:
      return produce(state, (draftState) => {
        draftState.error = payload;
        draftState.loading = false;
      });
    case REGISTER_LOADING:
      return produce(state, (draftState) => {
        draftState.loading = true;
      });
    case RESET_REGISTER_REDUX:
      return produce((state) => initialState);
    default:
      return state;
  }
};

export default registerReducer;
