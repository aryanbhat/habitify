import CreateHabitModal from "@/components/modal/CreateHabitModal";
import HabitCalendar from "@/components/HabitCalendar";
import AnimatedComponent from "@/components/AnimatedComponent";
import { CalendarValue, HabitValue } from "@/Types/type";

const Habits = () => {
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
    value: calendarValue,
    color: "blue",
    type: "checkbox",
    unit: "question",
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
