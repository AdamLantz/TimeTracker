import React from "react";
import { StyleSheet, View, Text } from "react-native";
import formatDuration from "../helpers/formatDuration";

const styles = StyleSheet.create({
  diffContainer: {
    borderRadius: 3,
    height: 42,
    minWidth: 60,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "#e0f6f9"
  }
});

export default class TimeDiff extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { minutes } = this.props;

    return (
      <View style={styles.diffContainer}>
        <Text>{formatDuration(minutes)}</Text>
      </View>
    );
  }
}
