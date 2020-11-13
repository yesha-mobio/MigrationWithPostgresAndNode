import client from "../../../apollo-client/client";
import {
  createBundleProduct,
  getAllBundleProducts,
  getBundleProductById,
  deleteBundleProduct,
} from "../../../queries/bundleProduct";
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
} from "./actionType";

const addBundleProductStart = {
  type: ADD_BUNDLE_PRODUCT_START,
};

const addBundleProductFail = {
  type: ADD_BUNDLE_PRODUCT_FAIL,
};

const addBundleProductSuccess = (addBundleProduct) => {
  return {
    type: ADD_BUNDLE_PRODUCT_SUCCESS,
    addBundleProduct,
  };
};

export const addBundleProduct = (bundle_id, product_id) => {
  return async (dispatch) => {
    dispatch(addBundleProductStart);

    const { data } = await client.mutate({
      mutation: createBundleProduct,
      variables: { bundle_id, product_id },
      refetchQueries: [{ query: getAllBundleProducts }],
    });

    if (data.error) {
      dispatch(addBundleProductFail);
    } else {
      dispatch(addBundleProductSuccess(data.createBundleProduct));
    }
  };
};

const getBundleProductListStart = {
  type: GET_BUNDLE_PRODUCT_LIST_START,
};

const getBundleProductListFail = {
  type: GET_BUNDLE_PRODUCT_LIST_FAIL,
};

const getBundleProductListSuccess = (bundleProductList) => {
  return {
    type: GET_BUNDLE_PRODUCT_LIST_SUCCESS,
    bundleProductList,
  };
};

export const getBundleProducts = () => {
  return async (dispatch) => {
    dispatch(getBundleProductListStart);

    const { data } = client.query({
      query: getAllBundleProducts,
    });

    if (data.error) {
      dispatch(getBundleProductListFail);
    } else {
      dispatch(getBundleProductListSuccess(data.getAllBundleProducts));
    }
  };
};

const viewBundleProductStart = {
  type: VIEW_BUNDLE_PRODUCT_START,
};

const viewBundleProductFail = {
  type: VIEW_BUNDLE_PRODUCT_FAIL,
};

const viewBundleProductSuccess = (singleBundleProduct) => {
  return { type: VIEW_BUNDLE_PRODUCT_SUCCESS, singleBundleProduct };
};

export const viewBundleProduct = (bundleProductId) => {
  return async (dispatch) => {
    dispatch(viewBundleProductStart);

    const { data } = await client.query({
      query: getBundleProductById,
      variables: { id: bundleProductId },
    });

    if (data.error) {
      dispatch(viewBundleProductFail);
    } else {
      dispatch(viewBundleProductSuccess(data.getBundleProductById));
    }
  };
};

const deleteBundleProductStart = {
  type: DELETE_BUNDLE_PRODUCT_START,
};

const deleteBundleProductFail = {
  type: DELETE_BUNDLE_PRODUCT_FAIL,
};

const deleteBundleProductSuccess = (bundleProductId) => {
  return { type: DELETE_BUNDLE_PRODUCT_SUCCESS, bundleProductId };
};

export const removeBundleProduct = (bundleProductId) => {
  return async (dispatch) => {
    dispatch(deleteBundleProductStart);

    const { data } = await client.mutate({
      mutation: deleteBundleProduct,
      variables: { id: bundleProductId },
      refetchQueries: [{ query: getAllBundleProducts }],
    });

    if (data.error) {
      dispatch(deleteBundleProductFail);
    } else {
      dispatch(deleteBundleProductSuccess(bundleProductId));
    }
  };
};
