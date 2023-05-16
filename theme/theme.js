import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";

const theme = extendTheme({
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1440px",
  },
  colors,
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderWidth: "1px",
      },
      variants: {
        green: {
          color: "white",
          borderColor: "emerald",
          backgroundColor: "emerald",
          _hover: {
            color: "emerald",
            backgroundColor: "white",
          },
        },
      },
    },
  },
});

export default theme;
