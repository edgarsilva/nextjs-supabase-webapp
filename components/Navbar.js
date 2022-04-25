import NextLink from "next/link";
import { Box, Divider, HStack, Link, Spinner } from "@chakra-ui/react";
import {useAuth} from "../hooks";

export function Navbar({}) {
  const { session, isLoading } = useAuth();

  if (isLoading) {
    return (
      <HStack as="nav" spacing="24px" p="4" bg="teal.400" color="whiteAlpha.900">
        <NextLink href="/" passHref>
          <Link>
            <Spinner size="sm" mr="4"/>
            Loading...
          </Link>
        </NextLink>
      </HStack>
    );
  }

  return (
    <HStack
      height="56px"
      as="nav"
      spacing="24px"
      p="4"
      bg="teal.400"
      color="whiteAlpha.900"
      alignItems="stretch"
    >
      <NextLink href="/" passHref>
        <Link>Home</Link>
      </NextLink>

      <NextLink href="/profile" passHref>
        <Link>Profile</Link>
      </NextLink>

        <Divider
          orientation="vertical"
          color="whiteAlpha.900"
          style={{ marginLeft: "auto" }}
        />

      {!!session ? (
        <NextLink href="/sign-out" passHref>
          <Link>
            Sign Out
          </Link>
        </NextLink>
      ) : (
        <NextLink href="/sign-in" passHref>
          <Link>
            Sign In
          </Link>
        </NextLink>
      )}
    </HStack>
  );
}
