
// UX with Chackra-ui
import {Button, Flex, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, SkeletonCircle, SkeletonText} from "@chakra-ui/react";
import supabase from "../lib/supabase";

// App components
import Avatar from "./Avatar"

// Hooks
import {useForm} from "react-hook-form";
import { useAuth, useProfileMutation } from "../hooks";

export default function ProfileFormPlaceholder() {
  const loading = true;

  return (
      <Flex
        direction="column"
        rowGap="8"
        py="16"
        px="8"
        rounded="lg"
        border="1px"
        boxShadow="2xl"
        w="50%"
        maxW="800px"
      >
        <SkeletonCircle size='24' />
        <SkeletonText mt='4' noOfLines={4} spacing='4' />

        <Button
          disabled={loading}
          colorScheme="teal"
        >
          {loading ? "Loading ..." : "Update"}
        </Button>

        <Button
          variant="outline"
          colorScheme="teal"
        >
          Sign Out
        </Button>
      </Flex>
  );
}
