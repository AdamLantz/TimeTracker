import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import DateTimePicker from "react-native-modal-datetime-picker";
import { endOfWeek, format } from "date-fns";

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default class WeekPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    };
  }

  handleChange(d) {
    const { onChange } = this.props;
    onChange(d);
  }

  render() {
    const { start, value, style: propStyles, valid } = this.props;
    const { showPicker } = this.state;

    const label = `Week of ${format(start, "MM/DD/YYYY")} - ${format(
      endOfWeek(start),
      "MM/DD/YYYY"
    )}`;

    return (
      <View style={[styles.container, propStyles]}>
        <Button
          title={label}
          type={value ? "solid" : "outline"}
          onPress={() => this.setState({ showPicker: true })}
          valid={valid}
        />
        <DateTimePicker
          mode="date"
          date={value}
          titleIOS={label}
          isVisible={showPicker}
          onConfirm={d => {
            this.handleChange(d);
            this.setState({
              showPicker: false
            });
          }}
          onCancel={() => this.setState({ showPicker: false })}
        />
      </View>
    );
  }
}
