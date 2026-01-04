import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { fetchHabitsList, reorderHabits } from "@/stores/habitSlice/habitSlice";
import CreateHabitModal from "@/components/modal/CreateHabitModal";
import HabitCalendar from "@/components/HabitCalendar";
import AnimatedComponent from "@/components/AnimatedComponent";
import { HabitValue } from "@/Types/type";
import LoadingBlockAnimationComp from "@/components/LoadingBlockAnimationComp/LoadingBlockAnimationComp";
import ReorderHabitsModal from "@/components/modal/ReorderHabitsModal";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export default function Habits() {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const { isLoading, data } = useAppSelector((state) => state.habits);
  const [isReorderMode, setIsReorderMode] = useState(false);

  useEffect(() => {
    dispatch(setNavbarState(0));
    if (user.uid) {
      dispatch(fetchHabitsList(user.uid));
    }
  }, [dispatch, user.uid]);

  const handleSaveOrder = (reorderedHabits: HabitValue[]) => {
    dispatch(reorderHabits({ userId: user.uid!, habits: reorderedHabits }));
    dispatch(fetchHabitsList(user.uid!));
    setIsReorderMode(false);
  };

  const handleCancelReorder = () => {
    setIsReorderMode(false);
  };

  const openReorderMode = () => {
    setIsReorderMode(true);
  };

  return (
    <AnimatedComponent>
      <div className="flex flex-col items-center justify-center gap-6 mb-4 p-4 w-[90vw]">
        {data && (
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-md items-center justify-center">
            <CreateHabitModal />
            {data.length > 0 && (
              <Button
                variant="outline"
                onClick={openReorderMode}
                className="w-full sm:w-auto"
              >
                <ArrowUpDown size={18} className="mr-2" />
                Reorder Habits
              </Button>
            )}
          </div>
        )}
        {isLoading ? (
          <div className="w-full flex justify-center items-center mt-60">
            <LoadingBlockAnimationComp />
          </div>
        ) : (
          <>
            {data && data.length > 0 ? (
              <div className="w-full flex flex-col items-center gap-10 ">
                {[...data]
                  .sort((a, b) => (a?.order || 0) - (b?.order || 0))
                  .map((habit: HabitValue, index: number) => (
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

      {/* Reorder Modal */}
      {isReorderMode && data && data.length > 0 && (
        <ReorderHabitsModal
          isOpen={isReorderMode}
          habits={[...data].sort((a, b) => (a?.order || 0) - (b?.order || 0))}
          onSave={handleSaveOrder}
          onCancel={handleCancelReorder}
        />
      )}
    </AnimatedComponent>
  );
}
