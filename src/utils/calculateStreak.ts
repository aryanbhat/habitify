import { CalendarValue } from "@/Types/type";
import { binarySearchDates, formatDate } from "./formatDate";

export function calculateStreaks(calendarValue: CalendarValue[]) {
  const dayDiff = 86400000;
  let currentStreak = 0;
  let longestStreak = 0;

  // Finding currentStreak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(today.getDate() - 1);

  const newDates = calendarValue
    .sort((a, b) => new Date(a.day).getTime() - new Date(b.day).getTime())
    .map((elem) => elem.day);

  // Finding the index of yesterday in the newDates array using binarySearch
  const idx = binarySearchDates(newDates, formatDate(yesterday));

  // If we find the idx, meaning yesterday's date is present
  if (idx !== -1) {
    let tempStreak = 1;
    for (let i = idx - 1; i >= 0; i--) {
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

  // To find the longestStreak
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

  // Update longestStreak for the last streak
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    totalEntries: calendarValue.length,
    currentStreak,
    longestStreak,
  };
}
