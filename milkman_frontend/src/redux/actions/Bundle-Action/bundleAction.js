import client from "../../../apollo-client/client";
import {
  createBundle,
  getAllBundles,
  getBundleById,
  deleteBundle,
  updateBundle,
} from "../../../queries/bundle";
import {
  ADD_BUNDLE_START,
  ADD_BUNDLE_FAIL,
  ADD_BUNDLE_SUCCESS,
  GET_BUNDLE_LIST_SUCCESS,
  GET_BUNDLE_LIST_FAIL,
  GET_BUNDLE_LIST_START,
  VIEW_BUNDLE_FAIL,
  VIEW_BUNDLE_SUCCESS,
  VIEW_BUNDLE_START,
  DELETE_BUNDLE_START,
  DELETE_BUNDLE_FAIL,
  DELETE_BUNDLE_SUCCESS,
  EDIT_BUNDLE_START,
  EDIT_BUNDLE_FAIL,
  EDIT_BUNDLE_SUCCESS,
} from "./actionType";

const addBundleStart = {
  type: ADD_BUNDLE_START,
};

const addBundleFail = {
  type: ADD_BUNDLE_FAIL,
};

const addBundleSuccess = (addBundle) => {
  return {
    type: ADD_BUNDLE_SUCCESS,
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
