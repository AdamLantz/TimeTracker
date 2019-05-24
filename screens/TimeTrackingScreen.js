import React from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import Day from "../components/Day";
import Total from "../components/Total";
import getTimeDiff from "../helpers/getTimeDiff";
import { startOfWeek, format, addDays } from "date-fns";
import saveTimeTracking from "../services/saveTimeTracking";
import loadTimeTracking from "../services/loadTimeTracking";
import WeekPicker from "../components/WeekPicker";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  sectionWrapper: {
    paddingHorizontal: 8,
    paddingTop: 8
  },
  weekOfText: {
    textAlign: "center"
  }
});

export default class TimeTrackingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.INITIAL_TIME_VALUES = {
      0: { inTime: null, outTime: null, lunchMinutes: 0 },
      1: { inTime: null, outTime: null, lunchMinutes: 0 },
      2: { inTime: null, outTime: null, lunchMinutes: 0 },
      3: { inTime: null, outTime: null, lunchMinutes: 0 },
      4: { inTime: null, outTime: null, lunchMinutes: 0 },
      5: { inTime: null, outTime: null, lunchMinutes: 0 },
      6: { inTime: null, outTime: null, lunchMinutes: 0 }
    };
    this.state = {
      loaded: false,
      weekToShow: startOfWeek(new Date()),
      time: this.INITIAL_TIME_VALUES
    };
    this.DAYS = [
      { id: 0 },
      { id: 1 },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 }
    ];
  }

  componentDidMount() {
    this.loadWeek(new Date());
  }

  loadWeek = dateInWeek => {
    const weekToShow = startOfWeek(dateInWeek);
    loadTimeTracking(weekToShow).then(data => {
      const time = data ? data : this.INITIAL_TIME_VALUES;
      this.setState({ loaded: true, time, weekToShow });
    });
  };

  componentDidUpdate() {
    const { weekToShow, time } = this.state;
    saveTimeTracking(weekToShow, time);
  }

  sumWorkedMinutes = () => {
    const { time } = this.state;
    return Object.values(time).reduce(
      (accum, day) =>
        accum + getTimeDiff(day.inTime, day.outTime, day.lunchMinutes),
      0
    );
  };

  render() {
    const { weekToShow, time, loaded } = this.state;
    if (!loaded) return null; // TODO: Loading state
    const SOW = weekToShow;

    return (
      <ScrollView style={styles.container}>
        <View style={styles.sectionWrapper}>
          <WeekPicker start={SOW} onChange={this.loadWeek} />
        </View>
        <View style={styles.sectionWrapper}>
          <Total minutesWorked={this.sumWorkedMinutes()} targetHours={40} />
        </View>
        <View style={styles.sectionWrapper}>
          {this.DAYS.map(day => {
            const date = addDays(weekToShow, day.id);
            const name = format(date, "dddd");
            const shortDate = format(date, "M/D");
            const { inTime, outTime, lunchMinutes } = time[day.id];
            return (
              <Day
                key={day.id}
                dayOfWeek={`${name} (${shortDate})`}
                inTime={inTime}
                outTime={outTime}
                lunchMinutes={lunchMinutes}
                onInChange={newIn =>
                  this.setState({
                    time: {
                      ...time,
                      [day.id]: { inTime: newIn, outTime, lunchMinutes }
                    }
                  })
                }
                onOutChange={newOut =>
                  this.setState({
                    time: {
                      ...time,
                      [day.id]: { outTime: newOut, inTime, lunchMinutes }
                    }
                  })
                }
                onLunchChange={newLunch =>
                  this.setState({
                    time: {
                      ...time,
                      [day.id]: { lunchMinutes: newLunch, inTime, outTime }
                    }
                  })
                }
              />
            );
          })}
        </View>
      </ScrollView>
    );
  }
}

TimeTrackingScreen.navigationOptions = {
  title: "Time Tracking"
};
