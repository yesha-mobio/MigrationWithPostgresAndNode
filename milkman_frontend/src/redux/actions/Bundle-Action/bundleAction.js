import client from "../../../apollo-client/client";
import {
  getAllBundles,
  deleteBundle,
  getBundleById,
  updateBundle,
  createBundle,
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
  EDIT_BUNDLE_START,
  EDIT_BUNDLE_FAIL,
  EDIT_BUNDLE_SUCCESS,
  ADD_BUNDLE_START,
  ADD_BUNDLE_FAIL,
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

const viewBundleSuccess = (singleBundle) => {
  return { type: VIEW_BUNDLE_SUCCESS, singleBundle };
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

const editBundleStart = {
  type: EDIT_BUNDLE_START,
};

const editBundleFail = {
  type: EDIT_BUNDLE_FAIL,
};

const editBundleSuccess = (updateBundle) => {
  console.log("EDIT BUNDLE IN SUCCESS");
  return {
    type: EDIT_BUNDLE_SUCCESS,
    updateBundle,
  };
};

export const editBundle = (bundleId, name, descriptiion) => {
  return async (dispatch) => {
    console.log("EDIT BUNDLE START");
    dispatch(editBundleStart);

    const { data } = await client.mutate({
      mutation: updateBundle,
      variables: {
        id: bundleId,
        name,
        descriptiion,
      },
    });
    console.log("EDIT BUNDLE DATA", data);

    if (data.error) {
      dispatch(editBundleFail);
    } else {
      console.log("EDIT BUNDLE START SUCCESS");
      dispatch(editBundleSuccess(data.updateBundle));
    }
  };
};

const addBundleStart = {
  type: ADD_BUNDLE_START,
};

const addBundleFail = {
  type: ADD_BUNDLE_FAIL,
};

const addBundleSuccess = (addBundle) => {
  return {
    type: EDIT_BUNDLE_SUCCESS,
    addBundle,
  };
};

export const addBundle = (name, description) => {
  return async (dispatch) => {
    dispatch(addBundleStart);

    const { data } = await client.mutate({
      mutation: createBundle,
      variables: {
        name,
        description,
      },
      refetchQueries: [{ query: getAllBundles }],
    });

    if (data.error) {
      dispatch(addBundleFail);
    } else {
      dispatch(addBundleSuccess(data.createBundle));
    }
  };
};
