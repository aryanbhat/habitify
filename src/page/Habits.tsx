import CreateHabitModal from "@/components/modal/CreateHabitModal";
import HabitCalendar from "@/components/HabitCalendar";
import AnimatedComponent from "@/components/AnimatedComponent";
import { CalendarValue, HabitValue } from "@/Types/type";

const Habits = () => {
  // date format is yyyy-mm-dd
  const calendarValue: CalendarValue[] = [
    { value: 100, day: "2024-02-05" },
    {
      value: 10,
      day: "2024-10-05",
    },
    {
      value: 25,
      day: "2024-05-14",
    },
    {
      value: 60,
      day: "2024-05-15",
    },
  ];

  const data: HabitValue = {
    title: "DSA",
    longest_streak: true,
    curr_streak: true,
    total_entries: true,
    value: calendarValue,
    color: "green",
  };

  return (
    <AnimatedComponent>
      <div className=" flex flex-col items-center justify-center gap-6">
        <CreateHabitModal />

        <HabitCalendar data={data} />
      </div>
    </AnimatedComponent>
  );
};

export default Habits;
