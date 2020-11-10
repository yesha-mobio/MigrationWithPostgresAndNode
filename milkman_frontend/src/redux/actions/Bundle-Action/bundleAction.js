import client from "../../../apollo-client/client";
import {
  getAllBundles,
  deleteBundle,
  getBundleById,
} from "../../../queries/bundle";
import {
  GET_BUNDLE_LIST_SUCCESS,
  GET_BUNDLE_LIST_FAIL,
  GET_BUNDLE_LIST_START,
  DELETE_BUNDLE_START,
  DELETE_BUNDLE_FAIL,
  DELETE_BUNDLE_SUCCESS,
  VIEW_BUNDLE_FAIL,
  VIEW_BUNDLE_SUCCESS,
  VIEW_BUNDLE_START,
} from "./actionType";

const getBundleStart = {
  type: GET_BUNDLE_LIST_START,
};

const getBundleFail = {
  type: GET_BUNDLE_LIST_FAIL,
};

const getBundleSuccess = (bundleList) => {
  return {
    type: GET_BUNDLE_LIST_SUCCESS,
    bundleList,
  };
};

export const getBundles = () => {
  return async (dispatch) => {
    dispatch(getBundleStart);

    const { data } = await client.query({
      query: getAllBundles,
    });

    if (data.error) {
      dispatch(getBundleFail);
    } else {
      dispatch(getBundleSuccess(data.getAllBundles));
    }
  };
};

const deleteBundleStart = {
  type: DELETE_BUNDLE_START,
};

const deleteBundleFail = {
  type: DELETE_BUNDLE_FAIL,
};

const deleteBundleSuccess = (bundleId) => {
  // window.location.reload(false);
  return { type: DELETE_BUNDLE_SUCCESS, bundleId };
};

export const removeBundle = (bundleId) => {
  return async (dispatch) => {
    dispatch(deleteBundleStart);

    const { data } = await client.mutate({
      mutation: deleteBundle,
      variables: { id: bundleId },
      // refetchQueries: [{ query: getAllBundles }],
    });

    if (data.error) {
      dispatch(deleteBundleFail);
    } else {
      dispatch(deleteBundleSuccess(bundleId));
    }
  };
};

const viewBundleStart = {
  type: VIEW_BUNDLE_START,
};

const viewBundleFail = {
  type: VIEW_BUNDLE_FAIL,
};

const viewBundleSuccess = (bundle) => {
  return { type: VIEW_BUNDLE_SUCCESS, bundle };
};

export const viewBundle = (bundleId) => {
  return async (dispatch) => {
    dispatch(viewBundleStart);

    const { data } = await client.query({
      query: getBundleById,
      variables: { id: bundleId },
    });

    if (data.error) {
      dispatch(viewBundleFail);
    } else {
      dispatch(viewBundleSuccess(data.getBundleById));
    }
  };
};
