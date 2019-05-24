import React from "react";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import SettingsScreen from "../screens/SettingsScreen";
import TimeTrackingScreen from "../screens/TimeTrackingScreen";
import COLORS from "../constants/Colors";

const TimeTrackingStack = createStackNavigator({
  TimeTracking: TimeTrackingScreen
});

TimeTrackingStack.navigationOptions = {
  tabBarLabel: "Time Tracking",
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="watch" />
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen
});

SettingsStack.navigationOptions = {
  tabBarLabel: "Preferences",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={"settings"} />
  )
};

export default createBottomTabNavigator(
  {
    TimeTrackingStack,
    SettingsStack
  },
  {
    tabBarOptions: { activeTintColor: COLORS.buttonColor }
  }
);
