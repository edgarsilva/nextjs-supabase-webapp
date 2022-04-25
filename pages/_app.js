// Providers
import { AuthProvider } from "../contexts/AuthContext";
import { ChakraProvider } from '@chakra-ui/provider';
import { QueryClient, QueryClientProvider } from 'react-query'

// Local app components
import Layout from "../components/Layout";

// 1. Import GlobalCSS and the extendTheme function
// 1.1 Global CSS should not really be used, that's why
//     we have the styles/global in the theme.
import '../styles/globals.css';
import { mode } from '@chakra-ui/theme-tools';
import { extendTheme } from '@chakra-ui/react';

// 2. Extend the theme to include custom colors, fonts, etc
export const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        color: mode('gray.800', 'whiteAlpha.800')(props),
        bg: mode('whiteAlpha.800', 'gray.800')(props),
      },
    }),
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  }
});

const queryClient = new QueryClient();

// 3. Pass the `theme` prop to the `ChakraProvider`
function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
