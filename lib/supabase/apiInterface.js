import supabase from "./client";
/** URL polyfill. Required for Supabase queries to work in React Native. */
import snakeize from "snakeize";
import camelize from "camelize";


export const fetchRecords = async (tableName, { colName = "profile_id", id, nextCursor = null, limit = 100 }) => {
  nextCursor = nextCursor ?? 0;

  let { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order('created_at', { ascending: false })
    .range(nextCursor, nextCursor + limit - 1);

  // console.log("Fetched records:", data);
  // console.log("Errors:", error);

  // console.log(`Read ${(data || []).length} records from '${tableName}' table - Supabase`);
  return camelize(data, { deep: true }) || [];
};

export const fetchRecord = async (tableName, { id, colName = "id" }) => {
  let { data, error } = await supabase
    .from(tableName)
    .select("*")
    .eq(colName, id)
    .limit(1)
    .single();

  if (error) {
    console.log("error:", error)
    throw new Error(`Record ${tableName}/<${colName}:${id}> was not found!`);
  }

  // console.log(`Fetched '${id}' from '${tableName}' table - Supabase`);
  return camelize(data, { deep: true });
};

export const updateRecord = async (tableName, payload) => {
  // console.log("Data to update:", snakeize(payload));
  const { data, error, status } = await supabase
    .from(tableName)
    .update(snakeize(payload))
    .eq("id", payload.id)
    .maybeSingle();

  if (error || !data || status != 200) {
    console.log("Error on update: ", error);
    throw new Error(`Record ${tableName}/${payload.id} was not updated!`);
  }

  // console.log(`Updated '${payload.id}' in '${tableName}' table - Supabase`);
  return camelize(data);
};

export const createRecord = async (tableName, payload) => {
  // console.log("Data to insert:", snakeize(payload));
  const { data, error } = await supabase
    .from(tableName)
    .insert(snakeize(payload))
    .limit(1)
    .maybeSingle();

  // console.log("Insert single record data:", data);
  if (error) {
    console.log("Error on create: ", error);
    throw new Error(`Insert Record in table '${tableName}' failed!`);
  }

  // console.log(`Inserted '${data.id}' into '${tableName}' table - Supabase`);
  return camelize(data);
};

export const insertRecords = async (tableName, payload) => {
  const { data, error } = await supabase
    .from(tableName)
    .insert(snakeize(payload));

  // console.log("Insert records data:", data);

  if (error) {
    console.log("Error on insert: ", error);
    throw new Error(`Insert multiple Records in table ${tableName} failed!`);
  }

  // console.log(`Inserted records into '${tableName}' table: \n${data.map(i => i.id)} - Supabase`);
  return camelize(data);
};

export const deleteRecord = async (tableName, { id }) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq("id", id)
    .limit(1)
    .maybeSingle();

  if (error) {
    // console.log("Error on delete: ", error);
    throw new Error(`Delete Record in ${tableName} failed!`);
  }

  // console.log(`Deleted 1 record with id '${data.id}' from '${tableName}' table - Supabase`);
  return camelize(data);
};

export const deleteRecords = async (tableName, { colName = "id", id }) => {
  const { data, error } = await supabase
    .from(tableName)
    .delete()
    .eq(colName, id);

  if (error) {
    // console.log("Error on delete: ", error);
    throw new Error(`Delete Record in ${tableName} failed!`);
  }

  // console.log(`Deleted ${data.length} records from '${tableName}' table - Supabase`);
  return camelize(data);
};

export const upload = async ({ bucket, file }, bucketId = "public") => {
  if (!file) {
    throw new Error("You must select an image to upload.");
  }

  const fileExt = file.name.split(".").pop();
  const fileName = `${Math.random()}.${fileExt}`;
  const filePath = `${fileName}`;

  let { error: uploadError } = await supabase.storage.from(bucket).upload(filePath, file);

  if (uploadError) throw uploadError;

  // const { data, error } = await supabase
  //   .storage
  //   .from(bucketId)
  //   .upload(`${path}/${id || "noid"}.${ext}`, decode(res), {
  //     cacheControl: '3600',
  //     upsert: false,
  //     contentType: `image/${ext}`
  //   });

  if (error) {
    throw uploadError;
    console.log("Bucket Upload error: ", error);
  }

  return camelize(data);
};

export const callRpc = async (rpcName, { nextCursor = null, limit = 3 }) => {
  const { data, error } =
    await supabase
          .rpc(rpcName)
          .order('created_at')
          .range(nextCursor, nextCursor + limit - 1);

  // console.log("RPC data =>", data);
  // console.log("RPC error =>", error);

  return camelize(data);
};

export const getBucketList = async ({ path }, bucketId = "public") => {
  const { data, error } = await supabase
  .storage
  .from(bucketId)
  .list(path, {
    limit: 10,
    offset: 0,
    sortBy: { column: 'created_at', order: 'desc' },
  })

  // console.log("Fetched user.profileId photos:", camelize(data, { deep: true }));
  // console.log("Errors:", error);

  return camelize(data)
}

export const getPublicUrl = (key, bucketId = "public") => {
  // Get bucket as first part of string e.g. public/uuid/uuid/filename.ext
  const bucket = key.split("/", 1).shift();
  const { data, error } = supabase
    .storage
    .from(bucket)
    .getPublicUrl(key.substring(bucket.length + 1));

  if (error) {
    // console.log("bucket:", bucket);
    // console.log("key:", key.substring(bucket.length + 1));
    // console.log("Public URL:", publicUrl);
  }

  return data.publicURL;
};