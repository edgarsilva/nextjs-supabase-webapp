import { useEffect, useState } from "react";
import supabase from "../lib/supabase/client";

import Image from 'next/image'
import {Avatar, Button, Container, Input, Stack} from "@chakra-ui/react";

export default function AvatarInput({ url, size, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage.from("avatars").download(path);
      if (error) {
        throw error;
      }
      const url = URL.createObjectURL(data);
      setAvatarUrl(url);
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      let { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file);

      if (uploadError) throw uploadError;

      onUpload(filePath);
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <Stack justify="center" align="center" textAlign="center" p="4" mb="4">
      {avatarUrl ? (
        <Avatar
          src={avatarUrl}
          size="2xl"
        />
      ) : (
        <Avatar size='2xl' name={"Not Found"} />
      )}
      <div style={{ width: size }}>
        <Button as="label" htmlFor="single" colorScheme="teal">
          {uploading ? "Uploading ..." : "Upload"}
        </Button>
        <Input
          style={{
            visibility: "hidden",
            position: "absolute",
          }}
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </Stack>
  );
}
