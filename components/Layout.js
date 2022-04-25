// Next-js components and libs
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Local app components
import {Navbar} from "../components/Navbar";

// UX with Chakra-UI
import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Flex,
  Heading,
  useColorMode} from "@chakra-ui/react";

export default function Layout({ children }) {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex direction="column" align="stretch" minH="100vh">
      <Navbar />

      <Flex direction="row" w="100%" align="center" justify="space-between" py="8" px="8">
        <Heading>Next.js + Supabase</Heading>
        <Button onClick={toggleColorMode}>
          Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Flex>

      <Flex as="main" flexGrow="1" width="100%">{ children }</Flex>

      <Box p="4" w="100%" textAlign="center" as="footer">
        <Divider mb="4" colorScheme="teal" size="xl" />
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