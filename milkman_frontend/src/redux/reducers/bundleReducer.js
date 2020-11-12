import {
  GET_BUNDLE_LIST_SUCCESS,
  GET_BUNDLE_LIST_FAIL,
  GET_BUNDLE_LIST_START,
  DELETE_BUNDLE_FAIL,
  DELETE_BUNDLE_START,
  DELETE_BUNDLE_SUCCESS,
  VIEW_BUNDLE_START,
  VIEW_BUNDLE_FAIL,
  VIEW_BUNDLE_SUCCESS,
  EDIT_BUNDLE_START,
  EDIT_BUNDLE_FAIL,
  EDIT_BUNDLE_SUCCESS,
  ADD_BUNDLE_START,
  ADD_BUNDLE_FAIL,
  ADD_BUNDLE_SUCCESS,
} from "../actions/Bundle-Action/actionType";

const initialState = {
  error: false,
  loading: false,
  bundleList: [],
  singleBundle: null,
  updateBundle: null,
  addBundle: null,
};

const BundleReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BUNDLE_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_BUNDLE_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case GET_BUNDLE_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        bundleList: action.bundleList,
      };
    case DELETE_BUNDLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case DELETE_BUNDLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case DELETE_BUNDLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        bundleList: [
          ...state.bundleList.filter(({ id }) => {
            return id !== action.id;
          }),
        ],
      };
    case VIEW_BUNDLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case VIEW_BUNDLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case VIEW_BUNDLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        singleBundle: action.singleBundle,
      };
    case EDIT_BUNDLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case EDIT_BUNDLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case EDIT_BUNDLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        updateBundle: action.updateBundle,
      };
    case ADD_BUNDLE_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ADD_BUNDLE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_BUNDLE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        addBundle: action.addBundle,
      };
    default:
      return state;
  }
};

export default BundleReducer;
