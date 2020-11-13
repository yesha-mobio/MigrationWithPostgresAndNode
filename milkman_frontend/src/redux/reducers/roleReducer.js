import {
  ADD_ROLE_START,
  ADD_ROLE_FAIL,
  ADD_ROLE_SUCCESS,
  GET_ROLE_LIST_START,
  GET_ROLE_LIST_FAIL,
  GET_ROLE_LIST_SUCCESS,
} from "../actions/Role-Action/actionType";

const initialState = {
  error: false,
  loading: false,
  addRole: null,
  roleList: [],
  //   singleRole: null,
  //   updateRole: null,
};

const RoleReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ROLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ADD_ROLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_ROLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        addRole: action.addRole,
      };
    case GET_ROLE_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_ROLE_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case GET_ROLE_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        roleList: action.roleList,
      };
    default:
      return state;
  }
};

export default RoleReducer;
