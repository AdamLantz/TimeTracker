import { AsyncStorage } from "react-native";
import { format, startOfWeek } from "date-fns";

const convertFromUnix = date => (date ? new Date(date) : null);

const loadTimeTracking = async date => {
  const key = `TimeTracking:time:${format(startOfWeek(date), "YYYY-MM-DD")}`;
  return AsyncStorage.getItem(key).then(data => {
    if (!data) return null;
    const timeEntries = JSON.parse(data);
    return timeEntries.reduce((accum, curr) => {
      return {
        ...accum,
        [curr.key]: {
          inTime: convertFromUnix(curr.inTime),
          outTime: convertFromUnix(curr.outTime),
          lunchMinutes: curr.lunchMinutes
        }
      };
    }, {});
  });
};

export default loadTimeTracking;
