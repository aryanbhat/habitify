import { CalendarValue } from "@/Types/type";

export type HabitDataSchema = {
  color: string;
  id: string;
  longestStreak: boolean;
  streak: boolean;
  title: string;
  total: boolean;
  type: string;
  unit: string;
  value: CalendarValue[];
};

export interface HabitState {
  data: HabitDataSchema[] | null;
  isLoading: boolean;
  error: string | null;
}

export const initialState: HabitState = {
  data: null,
  isLoading: false,
  error: null,
};
