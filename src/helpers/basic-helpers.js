export const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

export const getPercentage = (bigNum, smallNum) => {
  return Math.round((smallNum / bigNum) * 100);
};

export const dateFormatter = (date) => {
  const newDate = new Date(date);
  return newDate.toString().split(" ").splice(0, 4).join(" ");
};

export const timeFormatter = (time) => {
  // "2021-07-08 14:08:25-07"

  const arr = time.split(" ");
  const time2 = arr[1].split(":");
  // const time3 = time2.split('-')
  if (time2[0] > 12) {
    time2[0] -= 12;
    time2.join(":");
    const time3 = `${time2[0]}:${time2[2]}`;
    const time4 = time3.substring(0, time3.length - 3);
    return `${time4} pm`;
  }
  if (time2[0] === "12") {
    time2.join(":");
    const time3 = `${time2[0]}:${time2[2]}`;
    const time4 = time3.substring(0, time3.length - 3);
    return `${time4} pm`;
  }
  if (time2[0] === "00") {
    time2.join(":");
    time2[0] = 12;
    const time3 = `${time2[0]}:${time2[2]}`;
    const time4 = time3.substring(0, time3.length - 3);
    return `${time4} am`;
  }
  time2.join(":");
  const time3 = `${time2[0]}:${time2[2]}`;
  const time4 = time3.substring(0, time3.length - 3);
  return `${time4} am`;
};

export const getMinutes = (date, currentMS) => {
  if (!date || !currentMS) {
    return "0";
  }
  const newDate = new Date(date);
  // console.log("date", date);
  const ms = newDate.getTime();
  const seconds = Math.round((currentMS - ms) / 1000);

  if (seconds < 0) return `0 seconds ago`;
  if (seconds === 1) return `1 second ago`;
  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 120) return `${Math.round(seconds / 60)} minute ago`;
  if (seconds < 3600) return `${Math.round(seconds / 60)} minutes ago`;
  else return `${Math.round(seconds / 86400)} days ago`;
};
