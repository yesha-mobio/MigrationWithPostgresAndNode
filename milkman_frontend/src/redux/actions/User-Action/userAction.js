import client from "../../../Apollo-Client/client";
import {
  createUser,
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../../../Queries/user";
import {
  ADD_USER_START,
  ADD_USER_FAIL,
  ADD_USER_SUCCESS,
  GET_USER_LIST_START,
  GET_USER_LIST_FAIL,
  GET_USER_LIST_SUCCESS,
  VIEW_USER_START,
  VIEW_USER_FAIL,
  VIEW_USER_SUCCESS,
  DELETE_USER_START,
  DELETE_USER_FAIL,
  DELETE_USER_SUCCESS,
  EDIT_USER_START,
  EDIT_USER_FAIL,
  EDIT_USER_SUCCESS,
  SELECTED_USER,
} from "./actionType";

const addUserStart = {
  type: ADD_USER_START,
};

const addUserFail = {
  type: ADD_USER_FAIL,
};

const addUserSuccess = (addUser) => {
  return {
    type: ADD_USER_SUCCESS,
    addUser,
  };
};

export const addUser = (name, email, address, password, role_id) => {
  return async (dispatch) => {
    dispatch(addUserStart);

    const { data } = await client.mutate({
      mutation: createUser,
      variables: { name, email, address, password, role_id },
      // refetchQueries: [{ query: getAllUsers }],
    });

    if (data.error) {
      dispatch(addUserFail);
    } else {
      dispatch(addUserSuccess(data.createUser));
    }
  };
};

const getUserListStart = {
  type: GET_USER_LIST_START,
};

const getUserListFail = {
  type: GET_USER_LIST_FAIL,
};

const getUserListSuccess = (userList) => {
  return {
    type: GET_USER_LIST_SUCCESS,
    userList,
  };
};

export const getUsers = () => {
  return async (dispatch) => {
    dispatch(getUserListStart);

    const { data } = await client.query({
      query: getAllUsers,
    });

    if (data.error) {
      dispatch(getUserListFail);
    } else {
      dispatch(getUserListSuccess(data.getAllUsers));
    }
  };
};

const viewUserStart = {
  type: VIEW_USER_START,
};

const viewUserFail = {
  type: VIEW_USER_FAIL,
};

const viewUserSuccess = (singleUser) => {
  return { type: VIEW_USER_SUCCESS, singleUser };
};

export const viewUser = (userId) => {
  return async (dispatch) => {
    dispatch(viewUserStart);

    const { data } = await client.query({
      query: getUserById,
      variables: { id: userId },
    });

    if (data.error) {
      dispatch(viewUserFail);
    } else {
      dispatch(viewUserSuccess(data.getUserById));
    }
  };
};

const deleteUserStart = {
  type: DELETE_USER_START,
};

const deleteUserFail = {
  type: DELETE_USER_FAIL,
};

const deleteUserSuccess = (userId) => {
  return { type: DELETE_USER_SUCCESS, userId };
};

export const removeUser = (userId) => {
  return async (dispatch) => {
    dispatch(deleteUserStart);

    const { data } = await client.mutate({
      mutation: deleteUser,
      variables: { id: userId },
      refetchQueries: [{ query: getAllUsers }],
    });

    if (data.error) {
      dispatch(deleteUserFail);
    } else {
      dispatch(deleteUserSuccess(userId));
    }
  };
};

const editUserStart = {
  type: EDIT_USER_START,
};

const editUserFail = {
  type: EDIT_USER_FAIL,
};

const editUserSuccess = (editUser) => {
  return { type: EDIT_USER_SUCCESS, editUser };
};

export const updateSingleUser = ({ id, name, email, address, role_id }) => {
  return async (dispatch) => {
    dispatch(editUserStart);

    const { data } = await client.mutate({
      mutation: updateUser,
      variables: { id, name, email, address, role_id },
      refetchQueries: [{ query: getAllUsers }],
    });

    if (data.error) {
      dispatch(editUserFail);
    } else {
      dispatch(editUserSuccess(data.updateUser));
    }
  };
};

export const setSelectedUser = (selectedUser) => {
  return async (dispatch) => {
    dispatch({ type: SELECTED_USER, selectedUser });
  };
};
