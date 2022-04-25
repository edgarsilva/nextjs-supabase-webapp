import * as api  from "./apiInterface";

const COLLECTION_NAME = "profiles";

export const fetchProfile = async (payload) => api.fetchRecord(COLLECTION_NAME, payload);

export const updateProfile = async (payload) => api.updateRecord(COLLECTION_NAME, payload);

export const createProfile = async (payload) => api.createRecord(COLLECTION_NAME, payload);

export const deleteProfile = async (payload) => api.deleteRecord(COLLECTION_NAME, payload);