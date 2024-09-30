import { CalendarValue } from "@/Types/type";
import { binarySearchDates, formatDate } from "./formatDate";

export function calculateStreaks(calendarValue: CalendarValue[]) {
  const dayDiff = 86400000;
  let currentStreak = 0;
  let longestStreak = 0;

  // finding currentStreak
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const newDates = calendarValue
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
    .map((elem) => {
      return elem.day;
    });

  //finding the index of yesterday in the newDates array using binarySearch
  const idx = binarySearchDates(newDates, formatDate(yesterday));

  //if i get the idx i.e yesterday's date is present there
  if (idx != -1) {
    let tempStreak = 1;
    for (let i = idx - 1; i > 0; i--) {
      if (
        new Date(newDates[i + 1]).getTime() -
          new Date(newDates[i]).getTime() ===
        dayDiff
      ) {
        tempStreak++;
      } else {
        break;
      }
    }
    currentStreak = tempStreak;
  }

  //to find the longestStreak
  let tempStreak = 1;
  for (let i = 1; i < newDates.length; i++) {
    if (
      new Date(newDates[i]).getTime() - new Date(newDates[i - 1]).getTime() ===
      dayDiff
    ) {
      tempStreak++;
    } else {
      longestStreak = Math.max(longestStreak, tempStreak);
      tempStreak = 1;
    }
  }

  return {
    totalEntries: calendarValue.length,
    currentStreak,
    longestStreak,
  };
}
