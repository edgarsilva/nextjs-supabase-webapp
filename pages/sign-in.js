// React
import { useEffect } from "react";

// Next-js components and libs
import { useRouter } from "next/router";
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// UX with Chakra-UI
import { Box, Button, Center, Divider, Flex, Heading, useColorMode } from "@chakra-ui/react";

// App components
import SignInForm from '../components/SignInForm'

// Hooks
import { useAuth } from '../hooks';

export default function SignIn() {
  const { session, isLoading } = useAuth();
  const router = useRouter();
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    if (!session || isLoading) return;

    router.push("/");
  }, [session, router, isLoading]);

  return (
    <Flex direction="column" align="center" minH="100vh">
      <Head>
        <title>Create Next/Supabase App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Flex direction="row" w="100%" align="center" justify="space-between" py="8" px="8">
        <Heading>Next.js + Supabase</Heading>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Flex>

      <Center flexGrow="1" width="100%">
        <SignInForm />
      </Center>

      <Box p="4" w="100vw" textAlign="center">
        <Divider mb="4"/>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </Box>
    </Flex>
  );
};