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
} from "../Actions/Role-Action/actionType";

const initialState = {
  error: false,
  loading: false,
  addRole: null,
  roleList: [],
  singleRole: null,
  editRole: null,
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
    case VIEW_ROLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case VIEW_ROLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case VIEW_ROLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        singleRole: action.singleRole,
      };
    case DELETE_ROLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case DELETE_ROLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case DELETE_ROLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        roleList: [
          ...state.roleList.filter(({ id }) => {
            return id !== action.roleId;
          }),
        ],
      };
    case EDIT_ROLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case EDIT_ROLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case EDIT_ROLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        editRole: action.selectedRole,
      };
    case SELECTED_ROLE:
      return {
        ...state,
        editRole: action.selectedRole,
      };
    default:
      return state;
  }
};

export default RoleReducer;
