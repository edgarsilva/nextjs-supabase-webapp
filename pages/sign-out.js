// React
import { useEffect } from "react";

// UX with Chakra-UI
import { Box, Heading, Spinner } from "@chakra-ui/react";

// Hooks
import { useAuth } from '../hooks';
import {useRouter} from "next/router";

export default function SignIn() {
  const { signOut } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      await signOut();
      router.push("/");
    };

    logout();
  }, [router, signOut]);

  return (
    <Box>
      <Spinner size="xl" />
      <Heading>Logging out...</Heading>
    </Box>
  );
};
