import client from "../../../apollo-client/client";
import { authenticate } from "../../../authentication/authentication";
import { signin } from "../../../queries/auth";
import {
  LOGIN_USER_START,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
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
