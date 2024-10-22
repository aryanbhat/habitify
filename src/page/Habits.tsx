import CreateHabitModal from "@/components/modal/CreateHabitModal";
import HabitCalendar from "@/components/HabitCalendar";
import AnimatedComponent from "@/components/AnimatedComponent";
import { CalendarValue, HabitValue } from "@/Types/type";
import { useEffect } from "react";

import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { useAppDispatch } from "@/hooks/reduxHook";

const Habits = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNavbarState(0));
  });

  // date format is yyyy-mm-dd
  const calendarValue: CalendarValue[] = [
    { value: 1, day: "2024-02-05" },
    {
      value: 1,
      day: "2024-10-05",
    },
    {
      value: 1,
      day: "2024-05-14",
    },
    {
      value: 1,
      day: "2024-05-15",
    },
    {
      value: 1,
      day: "2024-08-16",
    },
  ];

  const data: HabitValue = {
    title: "DSA",
    longest_streak: true,
    curr_streak: true,
    total_entries: true,
    value: calendarValue as CalendarValue[],
    color: "blue",
    type: "number",
    unit: "question",
  };

  const secondData: HabitValue = {
    title: "Meditation",
    longest_streak: true,
    curr_streak: true,
    total_entries: true,
    value: [] as CalendarValue[],
    color: "coral",
    type: "checkbox",
    unit: "question",
  };

  return (
    <AnimatedComponent>
      <div className=" flex flex-col items-center justify-center gap-6 mb-4 ">
        <CreateHabitModal />
        <HabitCalendar data={data} />
        <HabitCalendar data={secondData} />
      </div>
    </AnimatedComponent>
  );
};

export default Habits;
