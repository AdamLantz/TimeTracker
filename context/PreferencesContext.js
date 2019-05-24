import React from "react";

const PreferencesContext = React.createContext({
  timeTracking: {
    weekendDays: [0, 6],
    defaultLunchMinutes: 30,
    showWeekendDays: true,
    militaryTime: false,
    targetHours: 40
  }
});

export default PreferencesContext;