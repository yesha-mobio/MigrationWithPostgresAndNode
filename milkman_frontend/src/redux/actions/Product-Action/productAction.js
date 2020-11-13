import client from "../../../apollo-client/client";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
} from "../../../queries/product";
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
} from "./actionType";

const addProductStart = {
  type: ADD_PRODUCT_START,
};

const addProductFail = {
  type: ADD_PRODUCT_FAIL,
};

const addProductSuccess = (addProduct) => {
  return {
    type: ADD_PRODUCT_SUCCESS,
    addProduct,
  };
};

export const addProduct = (name, description, price) => {
  return async (dispatch) => {
    dispatch(addProductStart);

    const { data } = await client.mutate({
      mutation: createProduct,
      variables: { name, description, price },
      refetchQueries: [{ query: getAllProducts }],
    });

    if (data.error) {
      dispatch(addProductFail);
    } else {
      dispatch(addProductSuccess(data.createProduct));
    }
  };
};

const getProductListStart = {
  type: GET_PRODUCT_LIST_START,
};

const getProductListFail = {
  type: GET_PRODUCT_LIST_FAIL,
};

const getProductListSuccess = (productList) => {
  return {
    type: GET_PRODUCT_LIST_SUCCESS,
    productList,
  };
};

export const getProducts = () => {
  return async (dispatch) => {
    dispatch(getProductListStart);

    const { data } = client.query({
      query: getAllProducts,
    });

    if (data.error) {
      dispatch(getProductListFail);
    } else {
      dispatch(getProductListSuccess(data.getAllProducts));
    }
  };
};

const viewProductStart = {
  type: VIEW_PRODUCT_START,
};

const viewProductFail = {
  type: VIEW_PRODUCT_FAIL,
};

const viewProductSuccess = (singleProduct) => {
  return { type: VIEW_PRODUCT_SUCCESS, singleProduct };
};

export const viewProduct = (productId) => {
  return async (dispatch) => {
    dispatch(viewProductStart);

    const { data } = await client.query({
      query: getProductById,
      variables: { id: productId },
    });

    if (data.error) {
      dispatch(viewProductFail);
    } else {
      dispatch(viewProductSuccess(data.getProductById));
    }
  };
};

const deleteProductStart = {
  type: DELETE_PRODUCT_START,
};

const deleteProductFail = {
  type: DELETE_PRODUCT_FAIL,
};

const deleteProductSuccess = (productId) => {
  return { type: DELETE_PRODUCT_SUCCESS, productId };
};

export const removeProduct = (productId) => {
  return async (dispatch) => {
    dispatch(deleteProductStart);

    const { data } = await client.mutate({
      mutation: deleteProduct,
      variables: { id: productId },
      refetchQueries: [{ query: getAllProducts }],
    });

    if (data.error) {
      dispatch(deleteProductFail);
    } else {
      dispatch(deleteProductSuccess(productId));
    }
  };
};
