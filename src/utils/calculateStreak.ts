import { CalendarValue } from "@/Types/type";

export function calculateStreaks(calendarValue: CalendarValue[]) {
  // Sort the array by date in descending order
  const sortedData = calendarValue.sort(
    (a, b) => new Date(b.day).getTime() - new Date(a.day).getTime()
  );

  const dates = sortedData.map((data) => {
    return data.day;
  });
  console.log(dates);

  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  const today = new Date();
  today.setHours(0, 0, 0, 0); // Set to beginning of the day
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let previousDate: Date | null = null;

  for (const entry of sortedData) {
    const currentDate = new Date(entry.day);
    currentDate.setHours(0, 0, 0, 0); // Set to beginning of the day

    if (previousDate === null) {
      // First iteration
      tempStreak = 1;
      if (currentDate.getTime() === yesterday.getTime()) {
        currentStreak = 1;
      }
    } else {
      const diffDays =
        (previousDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24);

      if (diffDays === 1) {
        // Consecutive day
        tempStreak++;
        if (previousDate <= yesterday) {
          currentStreak++;
        }
      } else {
        // Streak broken
        longestStreak = Math.max(longestStreak, tempStreak);
        tempStreak = 1;
        if (currentStreak === 0 && currentDate <= yesterday) {
          currentStreak = 1;
        } else {
          currentStreak = 0;
        }
      }
    }

    // Break the loop if we've gone past the day before yesterday
    if (currentDate < yesterday) {
      break;
    }

    previousDate = currentDate;
  }

  // Check if the last streak is the longest
  longestStreak = Math.max(longestStreak, tempStreak);

  return {
    totalEntries: calendarValue.length,
    currentStreak,
    longestStreak,
  };
}
