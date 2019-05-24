import React from "react";
import { ThemeProvider } from "react-native-elements";
import COLORS from "../constants/Colors";

const TP = props => {
  return (
    <ThemeProvider
      theme={{ colors: { primary: COLORS.buttonColor } }}
      {...props}
    />
  );
};

export default TP;
