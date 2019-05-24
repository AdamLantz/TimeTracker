const formatDuration = minutes => {
  const abs = Math.abs(minutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `${minutes < 0 ? "-" : ""}${h}h${m}m`;
};

export default formatDuration;
