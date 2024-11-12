export type HabitValue = {
  title: string;
  longestStreak?: boolean;
  streak?: boolean;
  total: boolean;
  value: CalendarValue[];
  color: string;
  type: string;
  unit: string;
  id: string;
};

export type CalendarValue = {
  value: number;
  day: string;
  journal: string;
};
