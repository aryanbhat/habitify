import CreateHabitModal from "@/components/modal/CreateHabitModal";
import HabitCalendar from "@/components/HabitCalendar";
import AnimatedComponent from "@/components/AnimatedComponent";

const Habits = () => {
  const data = [
    { value: 100, day: "2016-02-05" },
    {
      value: 10,
      day: "2016-10-05",
    },
  ];

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
