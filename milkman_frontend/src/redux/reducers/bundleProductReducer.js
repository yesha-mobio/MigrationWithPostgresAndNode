import {
  ADD_BUNDLE_PRODUCT_START,
  ADD_BUNDLE_PRODUCT_FAIL,
  ADD_BUNDLE_PRODUCT_SUCCESS,
  GET_BUNDLE_PRODUCT_LIST_START,
  GET_BUNDLE_PRODUCT_LIST_FAIL,
  GET_BUNDLE_PRODUCT_LIST_SUCCESS,
  VIEW_BUNDLE_PRODUCT_START,
  VIEW_BUNDLE_PRODUCT_FAIL,
  VIEW_BUNDLE_PRODUCT_SUCCESS,
  DELETE_BUNDLE_PRODUCT_START,
  DELETE_BUNDLE_PRODUCT_FAIL,
  DELETE_BUNDLE_PRODUCT_SUCCESS,
} from "../actions/BundleProduct-Action/actionType";

const initialState = {
  error: false,
  loading: false,
  addBundleProduct: null,
  bundleProductList: [],
  singleBundleProduct: null,
  //   updateBundleProduct: null,
};

const BundleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BUNDLE_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ADD_BUNDLE_PRODUCT_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_BUNDLE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        addBundleProduct: action.addBundleProduct,
      };
    case GET_BUNDLE_PRODUCT_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_BUNDLE_PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case GET_BUNDLE_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        bundleProductList: action.bundleProductList,
      };
    case VIEW_BUNDLE_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case VIEW_BUNDLE_PRODUCT_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case VIEW_BUNDLE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        singleBundleProduct: action.singleBundleProduct,
      };
    case DELETE_BUNDLE_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case DELETE_BUNDLE_PRODUCT_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case DELETE_BUNDLE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        bundleProductList: [
          ...state.bundleProductList.filter(({ id }) => {
            return id !== action.id;
          }),
        ],
      };
    default:
      return state;
  }
};

export default BundleProductReducer;
