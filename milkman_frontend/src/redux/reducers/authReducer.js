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
} from "../actions/Auth-Action/actionType";

const initialState = {
  error: false,
  loading: false,
  userDetails: null,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        userDetails: action.userDetails,
      };
    case REGISTER_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case REGISTER_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        userDetails: action.userDetails,
      };
    case LOGOUT_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case LOGOUT_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        userDetails: null,
      };
    default:
      return state;
  }
};

export default AuthReducer;
