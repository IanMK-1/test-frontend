import produce from "immer";

import {
  CREATE_ROLE_SUCCESS,
  CREATE_ROLE_FAILURE,
  CREATE_ROLE_LOADING,
} from "./create/types";

import {
  FETCH_ROLES_SUCCESS,
  FETCH_ROLES_FAILURE,
  FETCH_ROLES_LOADING,
} from "./roles/types";

const initialState = {
  createRole: {
    data: {},
    error: null,
    loading: false,
  },
  roles: {
    data: {},
    error: null,
    loading: false,
  },
};


const roleReducer = (state = initialState, action) => {
    const { type, payload } = action;
  
    switch (type) {
      case CREATE_ROLE_SUCCESS:
        return produce(state, (draftState) => {
          draftState.createRole.data = payload;
          draftState.createRole.loading = false;
        });
      case CREATE_ROLE_FAILURE:
        return produce(state, (draftState) => {
          draftState.createRole.error = payload;
          draftState.createRole.loading = false;
        });
      case CREATE_ROLE_LOADING:
        return produce(state, (draftState) => {
          draftState.createRole.loading = true;
        });
      case FETCH_ROLES_SUCCESS:
        return produce(state, (draftState) => {
          draftState.roles.data = payload;
          draftState.roles.loading = false;
        });
      case FETCH_ROLES_FAILURE:
        return produce(state, (draftState) => {
          draftState.roles.error = payload;
          draftState.roles.loading = false;
        });
      case FETCH_ROLES_LOADING:
        return produce(state, (draftState) => {
          draftState.roles.loading = true;
        });
      default:
        return state;
    }
  };
  
  export default roleReducer;