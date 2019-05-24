import React from "react";
import { StyleSheet, View, Text } from "react-native";
import formatDuration from "../helpers/formatDuration";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e0f6f9",
    borderRadius: 12,
    padding: 12
  },
  stat: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
  },
  bigNumber: {
    fontSize: 28
  },
  littlelabel: {}
});

export default class Day extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { minutesWorked, targetHours } = this.props;

    if (!minutesWorked) {
      minutesWorked = 0;
    }

    if (!targetHours) {
      targetHours = 40;
    }

    const done = formatDuration(minutesWorked);
    const remaining = formatDuration(targetHours * 60 - minutesWorked);
    return (
      <View style={styles.container}>
        <View style={styles.stat}>
          <Text style={styles.bigNumber}>{done}</Text>
          <Text style={styles.littlelabel}>worked this week</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.bigNumber}>{remaining}</Text>
          <Text style={styles.littlelabel}>left to go</Text>
        </View>
      </View>
    );
  }
}
