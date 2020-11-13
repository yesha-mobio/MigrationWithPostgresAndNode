import client from "../../../apollo-client/client";
import {
  authenticate,
  isAuthenticated,
  signout,
} from "../../../authentication/authentication";
import { signin } from "../../../queries/auth";
import { createUser, getAllUsers } from "../../../queries/user";
import {
  LOGIN_USER_START,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_START,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  LOGOUT_USER_START,
  LOGOUT_USER_FAIL,
  LOGOUT_USER_SUCCESS,
} from "./actionType";

const loginUserStart = {
  type: LOGIN_USER_START,
};

const loginUserFail = {
  type: LOGIN_USER_FAIL,
};

const loginUserSuccess = (userDetails) => {
  return {
    type: LOGIN_USER_SUCCESS,
    userDetails,
  };
};

export const loginUser = (email, password) => {
  return async (dispatch) => {
    dispatch(loginUserStart);

    const { data } = await client.mutate({
      mutation: signin,
      variables: { email, password },
    });

    if (data.error) {
      dispatch(loginUserFail);
    } else {
      authenticate(data, () => {});
      dispatch(loginUserSuccess(data.signin));
    }
  };
};

const registerUserStart = {
  type: REGISTER_USER_START,
};

const registerUserFail = {
  type: REGISTER_USER_FAIL,
};

const registerUserSuccess = (userDetails) => {
  return {
    type: REGISTER_USER_SUCCESS,
    userDetails,
  };
};

export const registerUser = (name, email, address, password, role_id) => {
  return async (dispatch) => {
    dispatch(registerUserStart);

    const { data } = await client.mutate({
      mutation: createUser,
      variables: { name, email, address, password, role_id },
      refetchQueries: [{ query: getAllUsers }],
    });

    if (data.error) {
      dispatch(registerUserFail);
    } else {
      dispatch(registerUserSuccess(data.createUser));
    }
  };
};

const logoutUserStart = {
  type: LOGOUT_USER_START,
};

const logoutUserFail = {
  type: LOGOUT_USER_FAIL,
};

const logoutUserSuccess = {
  type: LOGOUT_USER_SUCCESS,
};

export const logoutUser = () => {
  return async (dispatch) => {
    dispatch(logoutUserStart);

    const { user } = isAuthenticated();
    if (!user) {
      dispatch(logoutUserFail);
    } else {
      signout(() => {});
      dispatch(logoutUserSuccess);
    }
  };
};
