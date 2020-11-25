import client from "../../../Apollo-Client/client";
import {
  createBundleProduct,
  getAllBundleProducts,
  getBundleProductById,
  deleteBundleProduct,
  updateBundleProduct,
} from "../../../Queries/bundleProduct";
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
  EDIT_BUNDLE_PRODUCT_START,
  EDIT_BUNDLE_PRODUCT_FAIL,
  EDIT_BUNDLE_PRODUCT_SUCCESS,
  SELECTED_BUNDLE_PRODUCT,
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

    const { data } = await client.query({
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

const editBundleProductStart = {
  type: EDIT_BUNDLE_PRODUCT_START,
};

const editBundleProductFail = {
  type: EDIT_BUNDLE_PRODUCT_FAIL,
};

const editBundleProductSuccess = (editBundleProduct) => {
  return {
    type: EDIT_BUNDLE_PRODUCT_SUCCESS,
    editBundleProduct,
  };
};

export const updateSingleBundleProduct = ({ id, bundle_id, product_id }) => {
  return async (dispatch) => {
    dispatch(editBundleProductStart);

    const { data } = await client.mutate({
      mutation: updateBundleProduct,
      variables: {
        id,
        bundle_id,
        product_id,
      },
      refetchQueries: [{ query: getAllBundleProducts }],
    });

    if (data.error) {
      dispatch(editBundleProductFail);
    } else {
      dispatch(editBundleProductSuccess(data.updateBundleProduct));
    }
  };
};

export const setSelectedBundleProduct = (selectedBundleProduct) => {
  return async (dispatch) => {
    dispatch({ type: SELECTED_BUNDLE_PRODUCT, selectedBundleProduct });
  };
};
