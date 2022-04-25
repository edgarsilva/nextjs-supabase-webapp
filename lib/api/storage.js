import * as api  from "./apiInterface";
import supabase from "../supabase";
import camelize from "camelcase-keys";

const TABLE_NAME = "photos";
const BUCKET_NAME = "public";

export const fetchPhotos = async (payload) => api.fetchRecords(TABLE_NAME, payload);

export const fetchItemPhotos = async ({ itemId }) => {
  let { data, error } = await supabase
    .from(TABLE_NAME)
    .select(`
      id, device_uri, device_id, public_url, thumb_url, role, section
    `)
    .eq('item_id', itemId)
    .order('created_at', { ascending: false });

  // if (error) {
  //   console.log("Errors in fetchItemPhotos:", error);
  // }

  // console.log(`Fetched ${data && data.length} records from table '${TABLE_NAME}' - Supabase`);
  return camelize(data, { deep: true }) || [];
};

export const createPhoto = async (photo) => {
  const obj = {
    id: photo.id,
    uri: photo.uri,
    path: photo.path,
    deviceId: photo.deviceId,
  };

  const storageObj = await api.uploadPhoto(obj);

  if (!storageObj.key) {
    throw new Error("Photo upload to remote storage failed!", photo);
  }

  const publicUrl = api.getPublicUrl(storageObj.key);

  return api.createRecord(TABLE_NAME, {
    bucketId: BUCKET_NAME,
    objectId: storageObj.id,
    itemId: photo.itemId,
    collectionId: photo.collectionId,
    deviceData: photo,
    publicUrl,
    role: photo.role,
    section: photo.section,
    storageKey: storageObj.key,
    deviceId: photo.deviceId,
    deviceUri: photo.deviceUri,
  });
};

export const deletePhoto = async (payload) => api.deleteRecord(TABLE_NAME, payload);