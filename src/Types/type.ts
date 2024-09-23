export type HabitValue = {
  title: string;
  longest_streak?: number;
  curr_streak?: number;
  total_entries: number;
  value: CalendarValue[];
};

export type CalendarValue = {
  value: number;
  day: string;
};
