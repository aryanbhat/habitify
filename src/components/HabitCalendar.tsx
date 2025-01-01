import {
  CalendarIcon,
  TrendingUpIcon,
  BarChartIcon,
  Calendar,
  CheckCircle2,
} from "lucide-react";
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
import { Textarea } from "./ui/textarea";
import HabitDropDown from "./HabitDropDown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ScrollArea } from "./ui/scroll-area";

interface CalendarData {
  longestStreak: number;
  currentStreak: number;
  totalEntries: number;
}

export default function HabitCalendar(props: { data: HabitValue }) {
  const data: HabitValue = props.data;
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [open, setOpen] = useState(false);
  const [values, setValues] = useState(data.value);
  const [currentDay, setCurrentDay] = useState<string | null>("");
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
        padding: "8px 12px",
      },
    },
  };

  const toolTipStyle = {
    background: "hsl(var(--secondary))",
    color: "hsl(var(--secondary-foreground))",
    fontSize: "14px",
    // fontWeight: "bold",
    borderRadius: "6px",
    boxShadow:
      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    padding: "10px 14px",
    display: "flex",
    flexDirection: "column" as const,
    alignItems: "flex-start",
    gap: "4px",
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

  function handleEditTodayLog() {
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

  function handleYearChange(value: string) {
    console.log(value);
    setYear(value);
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
              className={` ${
                handleLogDisable() && " cursor-not-allowed"
              } hidden md:inline`}
            >
              Log Today
            </Button>
          </div>
          <div className="flex gap-6 items-center justify-center">
            <YearSelect handleYearChange={handleYearChange} year={year} />
            <HabitDropDown data={data} handleTodayLog={handleEditTodayLog} />
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-2 block">
          Click on any square in the calendar grid to view or edit the details
          for that day.
        </p>
        <ElementDialog
          open={open}
          setOpen={setOpen}
          currentDay={currentDay}
          type={data.type}
          setValues={setValues}
          unit={data.unit}
          values={values}
          id={data.id}
        />
        <div className=" w-full overflow-x-scroll md:overflow-x-visible ">
          <div className="min-w-[1100px] h-[40vh]">
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

                setCurrentDay(date.day);
                setOpen(true);
              }}
              data={values}
              from={`${year}-01-01`}
              theme={theme}
              to={`${year}-12-31`}
              emptyColor="#131D33"
              colors={colorsPallete[data.color as keyof typeof colorsPallete]}
              margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
              yearSpacing={40}
              monthBorderColor="#020817"
              dayBorderWidth={2}
              dayBorderColor="#020817"
              tooltip={({ day, value }) => (
                <div style={toolTipStyle}>
                  <span style={{ fontSize: "16px" }}>
                    {new Date(day).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                  {data.type === "checkbox" ? (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      {value ? <CheckCircle2 size={16} /> : null}
                      {value ? "Completed" : "Not completed"}
                    </span>
                  ) : (
                    <span>{`${value} ${data.unit}`}</span>
                  )}
                </div>
              )}
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
        {data.type === "number" && (
          <div className="flex justify-end items-center mt-4">
            <div className="flex items-center space-x-2 md:mr-8">
              <span className="text-sm font-medium">Less</span>
              {colorsPallete[data.color as keyof typeof colorsPallete].map(
                (color: string, index: number) => (
                  <div
                    key={index}
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: color }}
                  />
                )
              )}
              <span className="text-sm font-medium">More</span>
            </div>
          </div>
        )}
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

interface ElementDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentDay: string | null;
  type: string;
  values: CalendarValue[];
  setValues: React.Dispatch<React.SetStateAction<CalendarValue[]>>;
  unit: string;
  id: string;
}

export function ElementDialog({
  open,
  setOpen,
  currentDay,
  type,
  values,
  setValues,
  unit,
  id,
}: ElementDialogProps) {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState<number | "">("");
  const [isChecked, setIsChecked] = useState(false);
  const [journal, setJournal] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (currentDay && open) {
      const currentValue = values.find(
        (item: CalendarValue) => item.day === currentDay
      );
      if (currentValue) {
        setValue(currentValue.value);
        setJournal(currentValue.journal || "");
        setIsChecked(true);
        setIsEditing(false);
      } else {
        setValue("");
        setJournal("");
        setIsChecked(false);
        setIsEditing(true);
      }
    }
  }, [currentDay, open, values]);

  const handleClose = () => {
    setOpen(false);
    setValue("");
    setJournal("");
    setIsChecked(false);
    setIsEditing(false);
  };

  const handleSave = async () => {
    if (
      type === "number" &&
      (value === "" || (typeof value === "number" && value <= 0))
    ) {
      toast.error("Please enter a valid value", { id: "HabitCalendar" });
      return;
    }

    if (!isChecked) {
      toast.error("Please check the checkbox", { id: "HabitCalendar" });
      return;
    }

    setLoading(true);

    if (currentDay) {
      const newValue: CalendarValue = {
        day: currentDay,
        value:
          type === "number"
            ? typeof value === "number"
              ? value
              : parseFloat(value) || 0
            : 100,
        journal,
      };

      const updatedValues = values.some((item) => item.day === currentDay)
        ? values.map((item) => (item.day === currentDay ? newValue : item))
        : [...values, newValue];

      try {
        await setDoc(
          doc(db, `users/${user.uid}/habits`, id),
          {
            value: updatedValues,
          },
          { merge: true }
        );
        setValues(updatedValues);
        dispatch(updateValue(newValue));
        toast.success("Habit updated successfully", { id: "HabitCalendar" });
        setIsEditing(false);
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Something went wrong";
        toast.error(errorMessage, { id: "HabitCalendar" });
      } finally {
        setOpen(false);
      }
    }
    setLoading(false);
  };

  const remainingLines = 8 - journal.split("\n").length;
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className=" flex gap-6 items-center">
            <span>Track the day</span>
            <div className=" flex gap-2 items-center">
              <span>{<Calendar className=" h-12 w-4" />}</span>
              <span>{currentDay?.split("-").reverse().join("-")}</span>
            </div>
          </DialogTitle>
          <DialogDescription>
            {type === "checkbox"
              ? "Mark the checkbox for this day. Click save when you're done."
              : "Add the value and mark the checkbox for this day. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {type === "number" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right">
                Value
              </Label>
              <Input
                id="value"
                type="number"
                disabled={!isEditing}
                value={value}
                onChange={(e) =>
                  setValue(e.target.value ? parseFloat(e.target.value) : "")
                }
                className={`col-span-3 ${
                  !isEditing
                    ? "bg-muted text-foreground cursor-default overflow-x-auto whitespace-nowrap"
                    : ""
                }`}
                placeholder={`Enter value (${unit})`}
              />
            </div>
          )}
          <div className="grid grid-cols-4 items-start gap-4">
            <Label htmlFor="journal" className="text-right">
              Journal
            </Label>
            <Textarea
              disabled={!isEditing}
              id="journal"
              placeholder="Write your daily accomplishment..."
              value={journal}
              onChange={(e) => {
                const lines = e.target.value.split("\n");
                if (lines.length <= 8) {
                  setJournal(e.target.value);
                } else {
                  setJournal(lines.slice(0, 8).join("\n"));
                }
              }}
              className={`col-span-3 resize-none ${
                !isEditing
                  ? "text-white opacity-100 cursor-default overflow-y-auto"
                  : ""
              }`}
              rows={8}
              style={{ WebkitTextFillColor: "inherit" }}
            />
            <div className="col-span-3 col-start-2 text-sm text-muted-foreground">
              {remainingLines} {remainingLines === 1 ? "line" : "lines"}{" "}
              remaining
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="check" className="text-right">
              Completed
            </Label>
            <Checkbox
              disabled={!isEditing}
              id="check"
              checked={isChecked}
              onCheckedChange={(checked) => setIsChecked(!!checked)}
              className={`col-span-3 ${!isEditing ? "cursor-default" : ""}`}
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="submit"
            onClick={isEditing ? handleSave : () => setIsEditing(true)}
            disabled={loading}
          >
            {loading ? "Saving..." : isEditing ? "Save changes" : "Edit"}
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

function YearSelect({
  handleYearChange,
  year,
}: {
  handleYearChange: (value: string) => void;
  year: string;
}) {
  return (
    <Select onValueChange={handleYearChange} value={year}>
      <SelectTrigger className=" w-28">
        <SelectValue placeholder="Select Year" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea>
          <SelectItem key="2024" value="2024">
            2024
          </SelectItem>
          <SelectItem key="2025" value="2025">
            2025
          </SelectItem>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}
