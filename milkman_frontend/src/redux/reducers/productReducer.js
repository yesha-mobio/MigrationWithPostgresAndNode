import {
  ADD_PRODUCT_START,
  ADD_PRODUCT_FAIL,
  ADD_PRODUCT_SUCCESS,
  GET_PRODUCT_LIST_START,
  GET_PRODUCT_LIST_FAIL,
  GET_PRODUCT_LIST_SUCCESS,
  VIEW_PRODUCT_START,
  VIEW_PRODUCT_FAIL,
  VIEW_PRODUCT_SUCCESS,
  DELETE_PRODUCT_START,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
} from "../actions/Product-Action/actionType";

const initialState = {
  error: false,
  loading: false,
  addProduct: null,
  productList: [],
  singleProduct: null,
  //   updateProduct: null,
};

const ProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case ADD_PRODUCT_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case ADD_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        addProduct: action.addProduct,
      };
    case GET_PRODUCT_LIST_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case GET_PRODUCT_LIST_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        productList: action.productList,
      };
    case VIEW_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case VIEW_PRODUCT_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case VIEW_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        singleProduct: action.singleProduct,
      };
    case DELETE_PRODUCT_START:
      return {
        ...state,
        error: false,
        loading: true,
      };
    case DELETE_PRODUCT_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };
    case DELETE_PRODUCT_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        productList: [
          ...state.productList.filter(({ id }) => {
            return id !== action.id;
          }),
        ],
      };
    default:
      return state;
  }
};

export default ProductReducer;
