import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { ReactNode } from "react";

const chakraTheme = extendTheme({
  colors: {
    newBg: "#1d1d1d",
    lighterNewBg: "#262626",
    accent: "#04a51e",
  },
  styles: {
    global: {
      ".active-link": {
        color: "white",
      },
      ".active-like": {
        color: "red",
      },
    },
  },
});

export default function Providers({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={chakraTheme}>{children}</ChakraProvider>;
}
