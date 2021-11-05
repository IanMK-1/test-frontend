import produce from "immer";

import {
  CREATE_PERMISSION_SUCCESS,
  CREATE_PERMISSION_FAILURE,
  CREATE_PERMISSION_LOADING,
} from "./create/types";

const initialState = {
  createPermission: {
    data: {},
    error: null,
    loading: false,
  },
};

const permissionReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CREATE_PERMISSION_SUCCESS:
      return produce(state, (draftState) => {
        draftState.createPermission.data = payload;
        draftState.createPermission.loading = false;
      });
    case CREATE_PERMISSION_FAILURE:
      return produce(state, (draftState) => {
        draftState.createPermission.error = payload;
        draftState.createPermission.loading = false;
      });
    case CREATE_PERMISSION_LOADING:
      return produce(state, (draftState) => {
        draftState.createPermission.loading = true;
      });
    default:
      return state;
  }
};

export default permissionReducer;
