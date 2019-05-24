import { AsyncStorage } from "react-native";
import { format, startOfWeek } from "date-fns";

const convertToUnix = date => (date ? date.getTime() : null);

const saveTimeTracking = async (date, time) => {
  const key = `TimeTracking:time:${format(startOfWeek(date), "YYYY-MM-DD")}`;
  const value = JSON.stringify(
    Object.keys(time).reduce(
      (accum, curr) =>
        accum.concat({
          key: curr,
          inTime: convertToUnix(time[curr].inTime),
          outTime: convertToUnix(time[curr].outTime),
          lunchMinutes: time[curr].lunchMinutes
        }),
      []
    )
  );
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};

export default saveTimeTracking;
