import client from "../../../apollo-client/client";
import { createRole, getAllRoles } from "../../../queries/role";
import {
  ADD_ROLE_START,
  ADD_ROLE_FAIL,
  ADD_ROLE_SUCCESS,
  GET_ROLE_LIST_START,
  GET_ROLE_LIST_FAIL,
  GET_ROLE_LIST_SUCCESS,
} from "./actionType";

const addRoleStart = {
  type: ADD_ROLE_START,
};

const addRoleFail = {
  type: ADD_ROLE_FAIL,
};

const addRoleSuccess = (addRole) => {
  return {
    type: ADD_ROLE_SUCCESS,
    addRole,
  };
};

export const addRole = (name) => {
  return async (dispatch) => {
    dispatch(addRoleStart);

    const { data } = await client.mutate({
      mutation: createRole,
      variables: { name },
      refetchQueries: [{ query: getAllRoles }],
    });

    if (data.error) {
      dispatch(addRoleFail);
    } else {
      dispatch(addRoleSuccess(data.createRole));
    }
  };
};

const getRoleListStart = {
  type: GET_ROLE_LIST_START,
};

const getRoleListFail = {
  type: GET_ROLE_LIST_FAIL,
};

const getRoleListSuccess = (roleList) => {
  return {
    type: GET_ROLE_LIST_SUCCESS,
    roleList,
  };
};

export const getRoles = () => {
  return async (dispatch) => {
    dispatch(getRoleListStart);

    const { data } = client.query({
      query: getAllRoles,
    });

    if (data.error) {
      dispatch(getRoleListFail);
    } else {
      dispatch(getRoleListSuccess(data.getAllRoles));
    }
  };
};
