import { differenceInMinutes, setMilliseconds } from "date-fns";

const getTimeDiff = (inTime, outTime, lunchMinutes) => {
  const minDiff =
    inTime && outTime
      ? differenceInMinutes(
          setMilliseconds(outTime, 0),
          setMilliseconds(inTime, 0)
        )
      : 0;
  return minDiff - lunchMinutes;
};

export default getTimeDiff;
