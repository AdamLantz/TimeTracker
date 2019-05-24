import React from "react";
import { Button } from "react-native-elements";
import COLORS from "../constants/Colors";

const ValidityButton = props => {
  const { valid, ...rest } = props;
  let showAsError = valid === false;
  return showAsError ? <Button {...rest} buttonStyle={{backgroundColor: COLORS.buttonErrorColor}} /> : <Button {...rest} />;
};

export default ValidityButton;
