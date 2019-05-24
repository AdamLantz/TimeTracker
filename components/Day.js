import React from "react";
import { StyleSheet, View, Text } from "react-native";
import TimeInput from "./TimeInput";
import TimeDiff from "./TimeDiff";
import LunchButton from "./LunchButton";
import { isBefore } from "date-fns";
import getTimeDiff from "../helpers/getTimeDiff";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  entryLine: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  },
  inOutContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly"
  },
  timeInput: {
    paddingRight: 8
  },
  label: {
    fontWeight: "bold"
  }
});

export default class Day extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inTime: undefined,
      outTime: undefined,
      lunchMinutes: 0
    };
  }

  render() {
    const {
      dayOfWeek,
      inTime,
      outTime,
      lunchMinutes,
      onInChange,
      onOutChange,
      onLunchChange
    } = this.props;
    const valid = !inTime || !outTime || isBefore(inTime, outTime);
    return (
      <View style={styles.container}>
        <Text style={styles.label}>{dayOfWeek}</Text>
        <View style={styles.entryLine}>
          <View style={styles.inOutContainer}>
            <TimeInput
              style={styles.timeInput}
              label="In Time"
              value={inTime}
              onChange={onInChange}
              valid={valid}
            />
            <TimeInput
              style={styles.timeInput}
              label="Out Time"
              value={outTime}
              onChange={onOutChange}
              valid={valid}
            />
          </View>
          <LunchButton
            value={lunchMinutes}
            style={styles.timeInput}
            onChange={onLunchChange}
            defaultMinutes={30}
          />
          <TimeDiff minutes={getTimeDiff(inTime, outTime, lunchMinutes)} />
        </View>
      </View>
    );
  }
}
