import React from "react";
import { View, StyleSheet, Text, Modal } from "react-native";
import { Icon, Input } from "react-native-elements";
import Button from "./Button";
import COLORS from "../constants/Colors";

const styles = StyleSheet.create({
  container: { minWidth: 50 },
  menuBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 3,
    padding: 8
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 16
  },
  buttonRowItem: {
    paddingLeft: 8
  },
  inputLine: {
    flexDirection: "row",
    marginTop: 16
  },
  durationInput: {
    width: 80,
    flex: 1
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: "600"
  }
});

export default class LunchButton extends React.Component {
  constructor(props) {
    super(props);
    const { value, defaultMinutes } = this.props;
    this.DURATION_STEP = 15;
    this.state = {
      menuOpen: false,
      lunchDurationInput: `${value || defaultMinutes}`
    };
  }

  renderIcon(value) {
    if (value) return;
    return (
      <Icon
        type="material"
        name="restaurant"
        color={value ? "white" : COLORS.buttonColor}
      />
    );
  }
  renderTitle(value) {
    if (!value) return;
    return `${value}`;
  }

  handlePress = () => {
    const { value, defaultMinutes, onChange } = this.props;
    if (!value) {
      onChange(defaultMinutes);
    }
    if (value) {
      this.setState({ menuOpen: true });
    }
  };

  removeLunch = () => {
    const { onChange } = this.props;
    onChange(0);
    this.closeMenu();
  };

  updateLunchDuration = () => {
    const { onChange } = this.props;
    const { lunchDurationInput } = this.state;
    onChange(Number(lunchDurationInput));
    this.closeMenu();
  };

  handleLunchDurationInputChange = duration => {
    this.setState({ lunchDurationInput: duration });
  };

  closeMenu = () => {
    this.setState({ menuOpen: false });
  };

  incrementDuration = () => {
    const { lunchDurationInput } = this.state;
    const newVal = Number(lunchDurationInput) + this.DURATION_STEP;
    this.setState({
      lunchDurationInput: `${newVal}`
    });
  };

  decrementDuration = () => {
    const { lunchDurationInput } = this.state;
    const newVal = Number(lunchDurationInput) - this.DURATION_STEP;
    this.setState({
      lunchDurationInput: `${newVal}`
    });
  };

  render() {
    const { value, style: propStyles } = this.props;
    const { menuOpen, lunchDurationInput } = this.state;
    return (
      <View style={[styles.container, propStyles]}>
        <Button
          title={this.renderTitle(value)}
          icon={this.renderIcon(value)}
          type={value ? "solid" : "outline"}
          onPress={this.handlePress}
        />
        <Modal
          transparent
          animationType="fade"
          visible={menuOpen}
          onRequestClose={() => {
            this.setState({ menuOpen: false });
          }}
        >
          <View style={styles.menuBackdrop}>
            <View style={styles.menu}>
              <Text style={styles.menuTitle}>Update Lunch Duration</Text>
              <View style={styles.inputLine}>
                <Button
                  icon={<Icon type="material" name="remove" color="white" />}
                  onPress={this.decrementDuration}
                />
                <Input
                  keyboardType="numeric"
                  value={lunchDurationInput}
                  onChangeText={this.handleLunchDurationInputChange}
                  containerStyle={styles.durationInput}
                />
                <Button
                  icon={<Icon type="material" name="add" color="white" />}
                  onPress={this.incrementDuration}
                />
              </View>
              <View style={styles.buttonRow}>
                <View style={styles.buttonRowItem}>
                  <Button
                    title="Cancel"
                    type="outline"
                    onPress={this.closeMenu}
                  />
                </View>
                <View style={styles.buttonRowItem}>
                  <Button
                    icon={
                      <Icon
                        type="material"
                        name="delete"
                        color={COLORS.buttonColor}
                      />
                    }
                    type="outline"
                    onPress={this.removeLunch}
                  />
                </View>
                <View style={styles.buttonRowItem}>
                  <Button title="Save" onPress={this.updateLunchDuration} />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
