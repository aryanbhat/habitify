import { CalendarValue } from "@/Types/type";
import { binarySearchDates, formatDate } from "./formatDate";

export function calculateStreaks(calendarValue: CalendarValue[]) {
  const dayDiff = 86400000; // One day in milliseconds
  let currentStreak = 0;
  let longestStreak = 0;

  if (calendarValue.length === 0) {
    return {
      totalEntries: 0,
      currentStreak: 0,
      longestStreak: 0,
    };
  }

  // Create a new array instead of modifying the original
  const sortedValues = [...calendarValue].sort(
    (a, b) => new Date(a.day).getTime() - new Date(b.day).getTime()
  );

  const newDates = sortedValues.map((elem) => elem.day);

  // Finding currentStreak
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setHours(0, 0, 0, 0);
  yesterday.setDate(today.getDate() - 1);

  // Check for today's entry
  const todayFormatted = formatDate(today);
  const hasToday = newDates.includes(todayFormatted);

  const idx = binarySearchDates(newDates, formatDate(yesterday));

  // Calculate current streak
  if (hasToday || idx !== -1) {
    let tempStreak = 1;
    const startIdx = hasToday ? newDates.length - 1 : idx;

    for (let i = startIdx - 1; i >= 0; i--) {
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

  // Calculate longest streak
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
