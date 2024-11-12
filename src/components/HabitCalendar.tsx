import { CalendarIcon, TrendingUpIcon, BarChartIcon } from "lucide-react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { CalendarValue, HabitValue } from "@/Types/type";
import React, { useEffect, useState } from "react";
import { colorsPallete } from "@/constants/habitColor";
import { calculateStreaks } from "@/utils/calculateStreak";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import toast from "react-hot-toast";
import { Checkbox } from "./ui/checkbox";
import { formatDate } from "@/utils/formatDate";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { updateValue } from "@/stores/habitSlice/habitSlice";
import HabitDropDown from "./HabitDropDown";

interface CalendarData {
  longestStreak: number;
  currentStreak: number;
  totalEntries: number;
}

export default function HabitCalendar(props: { data: HabitValue }) {
  const data: HabitValue = props.data;

  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(data.value);
  const [currentDay, setCurrentDay] = useState<string | null>("");
  const [currValue, setCurrValue] = useState(0);
  const [calendarData, setCalendarData] = useState<CalendarData>({
    longestStreak: 0,
    currentStreak: 0,
    totalEntries: 0,
  });

  useEffect(() => {
    const { totalEntries, currentStreak, longestStreak } =
      calculateStreaks(values);

    setCalendarData({
      totalEntries,
      currentStreak,
      longestStreak,
    });
  }, [values]);

  const theme = {
    text: {
      fontSize: 14,
      fill: "rgba(255,255,255,0.6)",
    },
    tooltip: {
      container: {
        background: "hsl(var(--card))",
        color: "hsl(var(--card-foreground))",
        fontSize: "12px",
        borderRadius: "4px",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      },
    },
  };

  function handleTodayLog() {
    if (handleLogDisable()) {
      toast.error("You have already logged todays value", {
        id: "HabitCalendar",
        duration: 2000,
      });
      return;
    }
    const today = formatDate(new Date());
    setCurrentDay(today);
    setOpen(true);
  }

  function handleLogDisable(): boolean {
    const today = formatDate(new Date());
    const isPresent = values.find((value) => value.day === today);
    if (isPresent) {
      return true;
    }
    return false;
  }

  return (
    <div className="  bg-card text-card-foreground rounded-xl border shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ">
      <div className="p-6 space-y-6">
        <div className=" flex justify-between gap-5 md:flex-row  md:justify-between md:items-center md:mx-6">
          <div className="md:flex md:flex-row md:gap-8 flex flex-col items-start gap-2 ">
            <h2 className="text-2xl font-semibold tracking-tight  text-ellipsis overflow-hidden max-w-[50vw] text-center">
              {data.title}
            </h2>
            <Button
              onClick={handleTodayLog}
              className={` ${handleLogDisable() && " cursor-not-allowed"}`}
            >
              Log Today
            </Button>
          </div>
          <HabitDropDown data={data} />
        </div>{" "}
        <ElementDialog
          open={open}
          setOpen={setOpen}
          currentDay={currentDay}
          type={data.type}
          setValues={setValues}
          unit={data.unit}
          values={values}
          id={data.id}
          currValue={currValue}
        />
        <div className=" w-full overflow-x-auto">
          <div className="min-w-[1000px] h-[40vh]">
            <ResponsiveCalendar
              onClick={(date) => {
                const today = formatDate(new Date());
                if (date.day > today) {
                  toast.error(
                    "Oops! You can't select a future date. Please complete today's task first.",
                    { id: "HabitCalendar" }
                  );
                  return;
                }
                const isPresent = values.find(
                  (value) => value.day === date.day
                );
                if (isPresent) {
                  setCurrValue(isPresent.value);
                } else {
                  setCurrValue(0);
                }
                setCurrentDay(date.day);
                setOpen(true);
              }}
              data={values}
              from={`${new Date().getFullYear()}-01-01`}
              theme={theme}
              to={`${new Date().getFullYear()}-12-31`}
              emptyColor="#131D33"
              colors={colorsPallete[data.color as keyof typeof colorsPallete]}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              yearSpacing={40}
              monthBorderColor="#020817"
              dayBorderWidth={2}
              dayBorderColor="#020817"
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "row",
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: "right-to-left",
                },
              ]}
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t  border-border">
          {data.longestStreak && (
            <StatCard
              icon={<TrendingUpIcon className="w-6 h-6" />}
              label="Longest Streak"
              value={calendarData.longestStreak}
            />
          )}
          {data.streak && (
            <StatCard
              icon={<CalendarIcon className="w-6 h-6" />}
              label="Current Streak"
              value={calendarData.currentStreak}
            />
          )}
          {data.total && (
            <StatCard
              icon={<BarChartIcon className="w-6 h-6" />}
              label="Total Entries"
              value={calendarData.totalEntries}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function ElementDialog({
  open,
  setOpen,
  currentDay,
  type,
  values,
  setValues,
  unit,
  id,
  currValue,
}: {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  currentDay: string | null;
  type: string;
  values: CalendarValue[];
  setValues: React.Dispatch<CalendarValue[]>;
  unit: string;
  id: string;
  currValue: number;
}) {
  const dispatch = useAppDispatch();
  const [value, setValue] = useState<number | "">(currValue); // State for numeric input
  const [isChecked, setIsChecked] = useState<boolean>(false); // State for checkbox
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(currValue);
  }, [currValue]);

  function handleClose() {
    setIsChecked(false);
    setOpen(!open);
    setValue(currValue);
  }

  async function handleSave() {
    if (type === "number") {
      if (value === 0 || value === "") {
        if (type == "number") {
          toast.error("you have not entered any value.", {
            id: "HabitCalendar",
          });
          return;
        }
      }

      if (typeof value === "number" && value <= 0) {
        toast.error("Please enter valid value", { id: "HabitCalendar" });
        return;
      }

      if (typeof value === "string" && value <= "0") {
        toast.error("Please enter a valid value", { id: "HabitCalendar" });
        return;
      }
    }

    if (!isChecked) {
      toast.error("please check the checkbox", { id: "HabitCalendar" });
      return;
    }

    setLoading(true);

    if (currentDay) {
      let check = false;
      const updatedValue = values.map((item: CalendarValue) => {
        if (item.day === currentDay) {
          check = true;
          return { ...item, value: value as number };
        }
        return item;
      });

      if (!check) {
        updatedValue.push({
          day: currentDay as string,
          value: value == 0 ? 100 : (value as number),
        } as CalendarValue);
      }
      try {
        await setDoc(
          doc(db, `users/${user.uid}/habits`, id),
          {
            value: updatedValue,
          },
          {
            merge: true,
          }
        );
        setValues(updatedValue);
        dispatch(
          updateValue({
            habitId: id,
            day: currentDay,
            value,
          })
        );
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "something went wrong";
        toast.error(errorMessage, { id: "HabitCalendar" });
      }
    }
    setLoading(false);
    setOpen(!open);
    setValue(currValue);
    setIsChecked(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Track the day</DialogTitle>
          <DialogDescription>
            {type == "checkbox"
              ? "Mark the checkbox for this day. Click save when you're done."
              : "Add the value and mark the checkbox for this day. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center gap-4 py-4">
          {type == "number" && (
            <div className="flex w-full items-center gap-4">
              <Label htmlFor="value" className="text-right flex gap-2">
                Value
                <span className="text-slate-500 truncate max-w-[50px]">
                  ({unit})
                </span>
              </Label>
              <Input
                id="value"
                type="number"
                value={value}
                onChange={(e) =>
                  setValue(e.target.value ? parseInt(e.target.value) : "")
                }
                className="col-span-3"
                placeholder="Enter value"
              />
            </div>
          )}
          <div className="flex w-full items-center  gap-10">
            <Label htmlFor="check" className="text-right">
              Completed
            </Label>
            <div className="col-span-1">
              <Checkbox
                id="check"
                checked={isChecked}
                onCheckedChange={(checked) => setIsChecked(!!checked)}
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave} disabled={loading}>
            {loading ? "Loading..." : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center space-x-4 p-4 bg-card-background rounded-xl transition-all duration-300 hover:bg-primary/10 group min-w-96 ">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
          {label}
        </div>
        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {value} {value > 1 ? "days" : "day"}
        </div>
      </div>
    </div>
  );
}
