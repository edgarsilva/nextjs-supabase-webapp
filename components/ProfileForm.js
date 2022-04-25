
// UX with Chackra-ui
import {Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup} from "@chakra-ui/react";
import supabase from "../lib/supabase";

// App components
import Avatar from "./Avatar"

// Hooks
import {useForm} from "react-hook-form";
import { useAuth, useProfileMutation } from "../hooks";

export default function ProfileForm({ user, profile }) {
  const { signOut } = useAuth;
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: profile || {}
  });
  const onSubmit = data => console.log(data);
  const mutation = useProfileMutation();
  const loading = mutation.isLoading;

  async function updateProfile({ username, website, avatar_url }) {
    try {
      const values = {
        id: profile.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase
        .from("profiles")
        .upsert(values, {
          returning: "minimal", // Don't return the value after inserting
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    }
  }

  return (
      <Flex
        as="form"
        direction="column"
        rowGap="8"
        py="16"
        px="8"
        rounded="lg"
        border="1px"
        boxShadow="2xl"
        w="50%"
        maxW="800px"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Avatar
          url={profile.avatar_url}
          size={150}
          onUpload={(url) => {
            setAvatarUrl(url);
            updateProfile({ ...profile, avatar_url: url });
          }}
        />

        <FormControl>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input id="email" type="text" value={user.email} disabled />
        </FormControl>

        <FormControl isInvalid={errors.username} required>
          <FormLabel htmlFor="username">Username</FormLabel>
          <Input
            id="username"
            type="text"
            {...register("username", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum legth is 4 characters long"}
            })}
          />
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="website">Website</FormLabel>
          <Input
            id="website"
            type="website"
            {...register("website")}
          />
        </FormControl>

        <Button
          disabled={loading}
          colorScheme="teal"
          onClick={() => updateProfile({ username, website, avatar_url })}
        >
          {loading ? "Loading ..." : "Update"}
        </Button>

        <Button
          variant="outline"
          colorScheme="teal"
          onClick={() => supabase.auth.signOut()}
        >
          Sign Out
        </Button>
      </Flex>
  );
}
