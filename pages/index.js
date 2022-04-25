// Next-js components and libs
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// UX with Chakra-UI
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  useColorMode} from "@chakra-ui/react";

// Hooks
import { useAuth } from '../hooks';

export default function Home() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Center flexGrow="1" width="100%">
      <Heading>This is the index.</Heading>
    </Center>
  );
};