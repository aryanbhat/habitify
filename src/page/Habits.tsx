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
    // some time to show the animation
    const contentTimer = setTimeout(() => {
      setShowContent(true);
    }, 3000);

    return () => {
      clearTimeout(contentTimer);
    };
  }, [dispatch, user.uid]);

  return (
    <AnimatedComponent>
      <div className="flex flex-col items-center justify-center gap-6 mb-4 p-4 w-[90vw]">
        {data && <CreateHabitModal />}

        {!showContent || isLoading ? (
          //loading state here for habits
          <div className="w-full flex justify-center items-center">
            <iframe
              width="300"
              height="300"
              className="w-[300px] h-[300px]"
              src="https://lottie.host/embed/66d1a1df-b11d-4447-8260-9815560d4b9b/QvwzVU19gp.json"
            ></iframe>
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              <div className="w-full flex flex-col items-center gap-10 ">
                {data.map((habit: HabitValue, index: number) => (
                  <div key={index} className=" w-[80vw]">
                    <div className=" w-[81vw]">
                      <HabitCalendar data={habit} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center p-6 bg-card rounded-lg shadow-md">
                <h1 className="text-xl sm:text-2xl font-semibold mb-4">
                  No habits created yet
                </h1>
                <p className="text-muted-foreground">
                  You have no habits right now. Please create one to get
                  started.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </AnimatedComponent>
  );
}
