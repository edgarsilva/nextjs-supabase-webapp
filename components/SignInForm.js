import { useState } from "react";

// UX with Chakra-ui
import {
  Button,
  Flex,
  Heading,
  Input,
  Spinner,
  Text,
  Icon,
  InputGroup,
  InputRightElement,
  Divider,
  Link,
  Box,
  useToast
} from "@chakra-ui/react";
import { VscWand } from "react-icons/vsc";

// Hooks
import { useAuth } from "../hooks";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [isSignup, setIsSignup] = useState("");
  const toast = useToast();
  const [show, setShow] = useState(false);
  const { signInWithEmail, signUpWithEmail } = useAuth();
  const handleClick = () => setShow(!show);

  const handleLogin = async (email) => {
    try {
      setLoading(true);
      let error = null;
      if (isSignup) {
        const res = await signUpWithEmail(email, password);
        error = res.error;
      } else {
        const res = await signInWithEmail(email, password);
        error = res.error;
      }

      if (error) throw error;
      if (!isSignup) return;

      toast({
        title: 'Account created.',
        description: "We've created your account for you.",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'An error occurred!',
        description: isSignup ? "User already registered" : "Incorrect login credentials",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

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
      <Heading className="description">{ isSignup ? "Sign up" : "Sign in" }</Heading>
      <InputGroup variant="filled" size="lg">
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </InputGroup>
      <InputGroup variant="filled" size="lg">
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleClick}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      { isSignup && (
        <InputGroup variant="filled" size="lg">
          <Input
            pr="4.5rem"
            type={show ? "text" : "password"}
            placeholder="Confirm password"
            onChange={(e) => setConfirmation(e.target.value)}
          />
          </InputGroup>
      )}
      <Button
        rightIcon={<Icon as={VscWand} boxSize="7" />}
        colorScheme="teal"
        disabled={loading}
        onClick={(e) => {
          e.preventDefault();
          handleLogin(email);
        }}
      >
        {loading ? <Spinner /> : <Text>Submit</Text>}
      </Button>
      <Divider />
      <Box textAlign="center">
        {isSignup ? (
          <Link onClick={() => setIsSignup(false)}>Click here to Sign In instead!</Link>
        ) : (
          <Link onClick={() => setIsSignup(true)}>Click here to Sign Up instead!</Link>
        )}
      </Box>
    </Flex>
  );
}
