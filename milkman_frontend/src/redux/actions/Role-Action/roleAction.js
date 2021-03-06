import client from "../../../Apollo-Client/client";
import {
  createRole,
  deleteRole,
  getAllRoles,
  getRoleById,
  updateRole,
} from "../../../Queries/role";
import {
  ADD_ROLE_START,
  ADD_ROLE_FAIL,
  ADD_ROLE_SUCCESS,
  GET_ROLE_LIST_START,
  GET_ROLE_LIST_FAIL,
  GET_ROLE_LIST_SUCCESS,
  VIEW_ROLE_START,
  VIEW_ROLE_FAIL,
  VIEW_ROLE_SUCCESS,
  DELETE_ROLE_START,
  DELETE_ROLE_FAIL,
  DELETE_ROLE_SUCCESS,
  EDIT_ROLE_START,
  EDIT_ROLE_FAIL,
  EDIT_ROLE_SUCCESS,
  SELECTED_ROLE,
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

    const { data } = await client.query({
      query: getAllRoles,
    });

    if (data.error) {
      dispatch(getRoleListFail);
    } else {
      dispatch(getRoleListSuccess(data.getAllRoles));
    }
  };
};

const viewRoleStart = {
  type: VIEW_ROLE_START,
};

const viewRoleFail = {
  type: VIEW_ROLE_FAIL,
};

const viewRoleSuccess = (singleRole) => {
  return { type: VIEW_ROLE_SUCCESS, singleRole };
};

export const viewRole = (roleId) => {
  return async (dispatch) => {
    dispatch(viewRoleStart);

    const { data } = await client.query({
      query: getRoleById,
      variables: { id: roleId },
    });

    if (data.error) {
      dispatch(viewRoleFail);
    } else {
      dispatch(viewRoleSuccess(data.getRoleById));
    }
  };
};

const deleteRoleStart = {
  type: DELETE_ROLE_START,
};

const deleteRoleFail = {
  type: DELETE_ROLE_FAIL,
};

const deleteRoleSuccess = (roleId) => {
  return { type: DELETE_ROLE_SUCCESS, roleId };
};

export const removeRole = (roleId) => {
  return async (dispatch) => {
    dispatch(deleteRoleStart);

    const { data } = await client.mutate({
      mutation: deleteRole,
      variables: { id: roleId },
      refetchQueries: [{ query: getAllRoles }],
    });

    if (data.error) {
      dispatch(deleteRoleFail);
    } else {
      dispatch(deleteRoleSuccess(roleId));
    }
  };
};

const editRoleStart = {
  type: EDIT_ROLE_START,
};

const editRoleFail = {
  type: EDIT_ROLE_FAIL,
};

const editRoleSuccess = (editRole) => {
  return { type: EDIT_ROLE_SUCCESS, editRole };
};

export const updateSingleRole = ({ id, name }) => {
  return async (dispatch) => {
    dispatch(editRoleStart);

    const { data } = await client.mutate({
      mutation: updateRole,
      variables: { id, name },
      refetchQueries: [{ query: getAllRoles }],
    });

    if (data.error) {
      dispatch(editRoleFail);
    } else {
      dispatch(editRoleSuccess(data.updateRole));
    }
  };
};

export const setSelectedRole = (selectedRole) => {
  return async (dispatch) => {
    dispatch({ type: SELECTED_ROLE, selectedRole });
  };
};
