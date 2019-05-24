import React from "react";
import { View, StyleSheet } from "react-native";
import Button from "./Button";
import DateTimePicker from "react-native-modal-datetime-picker";
import { format } from "date-fns";

const styles = StyleSheet.create({
  container: { flex: 1 }
});

export default class TimeInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showPicker: false
    };
  }

  formatTime(date, fallback) {
    if (!date) {
      return fallback;
    }
    return format(date, "h:mm A");
  }

  handleTimeChange(t) {
    const { onChange } = this.props;
    onChange(t);
  }

  render() {
    const { label, value, style: propStyles, valid } = this.props;
    const { showPicker } = this.state;
    return (
      <View style={[styles.container, propStyles]}>
        <Button
          title={this.formatTime(value, label)}
          type={value ? "solid" : "outline"}
          onPress={() => this.setState({ showPicker: true })}
          valid={valid}
        />
        <DateTimePicker
          mode="time"
          date={value ? value : undefined}
          titleIOS={label}
          is24Hour={false}
          isVisible={showPicker}
          onConfirm={d => {
            this.handleTimeChange(d);
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
