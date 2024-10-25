import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { fetchHabitsList } from "@/stores/habitSlice/habitSlice";
import CreateHabitModal from "@/components/modal/CreateHabitModal";
import HabitCalendar from "@/components/HabitCalendar";
import AnimatedComponent from "@/components/AnimatedComponent";
import { HabitValue } from "@/Types/type";

export default function Habits() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, data } = useAppSelector((state) => state.habits);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    dispatch(setNavbarState(0));
    if (user.uid) {
      dispatch(fetchHabitsList(user.uid));
    }

    // Add a 3-second delay before showing the content
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    // Clean up the timer
    return () => clearTimeout(timer);
  }, [dispatch, user.uid]);

  return (
    <AnimatedComponent>
      <div className="flex flex-col items-center justify-center gap-6 mb-4">
        <CreateHabitModal />

        {!showContent || isLoading ? (
          <iframe
            width="300"
            height="300"
            className="w-[300px] h-[300px]"
            src="https://lottie.host/embed/66d1a1df-b11d-4447-8260-9815560d4b9b/QvwzVU19gp.json"
          ></iframe>
        ) : (
          <>
            {data && data.length > 0 ? (
              data.map((habit: HabitValue, index: number) => (
                <HabitCalendar key={index} data={habit} />
              ))
            ) : (
              <div>
                <h1>You have no habits right now, Please create one.</h1>
              </div>
            )}
          </>
        )}
      </div>
    </AnimatedComponent>
  );
}
