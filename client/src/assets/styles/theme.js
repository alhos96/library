import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#20476E",
    },
    secondary: {
      main: "#F3C416",
    },
    text: {
      primary: "#3D4498",
      secondary: "rgba(18,18,18,0.8)",
      disabled: "rgba(18,18,18,0.2)",
      hint: "rgba(18,18,18,0.5)",
      white: "#fff",
    },
    divider: "#F3C416",
  },
  typography: {
    fontSize: 14,
    h1: "28px",
    h2: "26px",
    h3: "25px",
    h4: "23px",
    h5: "20px",
    h6: "17px",
    fontFamily: "Times New Roman",
  },
});
