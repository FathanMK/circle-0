import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();
const chakraTheme = extendTheme({
  colors: {
    newBg: "#1d1d1d",
    lighterNewBg: "#262626",
    accent: "#04a51e",
  },
  styles: {
    global: {
      ".active-link": {
        color: "white !important",
      },
      ".active-like": {
        color: "red",
      },
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider
        theme={chakraTheme}
        toastOptions={{
          defaultOptions: {
            position: "bottom-right",
            duration: 3000,
            isClosable: true,
          },
        }}
      >
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
