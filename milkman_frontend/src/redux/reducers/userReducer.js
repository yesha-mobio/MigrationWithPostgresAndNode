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
} from "../Actions/User-Action/actionType";

const initialState = {
  error: false,
  loading: false,
  addUser: null,
  userList: [],
  singleUser: null,
  editUser: null,
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        addUser: action.addUser,
      };
    case GET_USER_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_USER_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case GET_USER_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        userList: action.userList,
      };
    case VIEW_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case VIEW_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case VIEW_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        singleUser: action.singleUser,
      };
    case DELETE_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case DELETE_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case DELETE_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        userList: [
          ...state.userList.filter(({ id }) => {
            return id !== action.userId;
          }),
        ],
      };
    case EDIT_USER_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        editUser: action.selectedUser,
      };
    case SELECTED_USER:
      return {
        ...state,
        editUser: action.selectedUser,
      };
    default:
      return state;
  }
};

export default UserReducer;
