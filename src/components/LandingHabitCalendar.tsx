import { CalendarIcon, TrendingUpIcon, BarChartIcon } from "lucide-react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { CalendarValue, HabitValue } from "@/Types/type";
import React, { useEffect, useRef, useState } from "react";
import { colors, colorsPallete } from "@/constants/habitColor";
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
  const [open, setOpen] = useState(false);
  const [colorValue, setColorValue] = useState(data.color);
  const [values, setValues] = useState(data.value);
  const [currentDay, setCurrentDay] = useState<string | null>("");
  const [calendarData, setCalendarData] = useState<CalendarData>({
    longestStreak: 0,
    currentStreak: 0,
    totalEntries: 0,
  });
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { totalEntries, currentStreak, longestStreak } =
      calculateStreaks(values);
    setCalendarData({ totalEntries, currentStreak, longestStreak });
  }, [values]);

  const theme = {
    text: {
      fontSize: 14,
      fill: "rgba(255,255,255,0.7)",
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

  function handleSelectChange(value: string) {
    setColorValue(value);
  }

  function handleMouseEnter(value: string) {
    setColorValue(value);
  }

  function handleMouseLeave() {
    setColorValue(data.color);
  }

  return (
    <div className="bg-card text-card-foreground rounded-xl border shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="p-6 space-y-6">
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="  text-2xl font-semibold tracking-tight text-center">
            {data.title}{" "}
            <span className="underline" style={{ color: colorValue }}>
              CONSISTENTLY
            </span>
          </h2>
          <div className="w-full sm:w-60 flex flex-col justify-center items-center gap-4">
            <p className="text-md text-slate-300">
              Customise your graph from here
            </p>
            <Select onValueChange={handleSelectChange} value={colorValue}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Color" />
              </SelectTrigger>
              <SelectContent className="h-48">
                <ScrollArea>
                  {colors.map((elem: string) => (
                    <SelectItem
                      key={elem}
                      value={elem}
                      onMouseEnter={() => handleMouseEnter(elem)}
                      onMouseLeave={handleMouseLeave}
                    >
                      <div className="flex items-center justify-between w-24">
                        <span>{elem}</span>
                        <div
                          className="h-4 w-4 rounded-xl"
                          style={{ backgroundColor: elem }}
                        ></div>
                      </div>
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
        </div>
        <ElementDialog
          open={open}
          setOpen={setOpen}
          currentDay={currentDay}
          type={data.type}
          setValues={setValues}
          unit={data.unit}
          values={values}
        />
        <div className="w-full overflow-x-auto" ref={calendarRef}>
          <div className="min-w-[1000px] h-[40vh]">
            <ResponsiveCalendar
              onClick={(date) => {
                const today = formatDate(new Date());
                if (date.day > today) {
                  toast.error(
                    "Oops! You can't select a future date. Please complete today's task first.",
                    {
                      id: "LandingHabitCalendar",
                    }
                  );
                  return;
                }
                setCurrentDay(date.day);
                setOpen(true);
              }}
              data={values}
              from={`${new Date().getFullYear()}-01-01`}
              theme={theme}
              to={`${new Date().getFullYear()}-12-31`}
              emptyColor="#131D33"
              colors={colorsPallete[colorValue as keyof typeof colorsPallete]}
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
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-border">
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
}: {
  open: boolean;
  setOpen: React.Dispatch<boolean>;
  currentDay: string | null;
  type: string;
  values: CalendarValue[];
  setValues: React.Dispatch<CalendarValue[]>;
  unit: string;
}) {
  const [value, setValue] = useState<number | "">(0); // State for numeric input
  const [isChecked, setIsChecked] = useState<boolean>(false); // State for checkbox

  function handleClose() {
    setValue("");
    setIsChecked(false);
    setOpen(!open);
  }

  function handleSave() {
    if (value === 0 || value === "") {
      if (type == "number") {
        toast.error("you have not entered any value.", {
          id: "LandingHabitCalendar",
        });
        return;
      }
    }
    if (!isChecked) {
      toast.error("please check the checkbox", {
        id: "LandingHabitCalendar",
      });
      return;
    }
    if (currentDay) {
      const newValue: CalendarValue = {
        day: currentDay as string,
        value: value == 0 ? 100 : (value as number),
      };
      setValues([...values, newValue]);
    }
    setOpen(!open);
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
        <div className="grid gap-4 py-4">
          {type == "number" && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="value" className="text-right flex gap-2">
                Value
                <span className=" text-slate-500 ">({unit})</span>
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
          {/* Checkbox input using Shadcn Checkbox component */}
          <div className="grid grid-cols-4 items-center gap-4">
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
          <Button type="submit" onClick={handleSave}>
            Save changes
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
    <div className="flex items-center space-x-4 p-4 bg-card-background rounded-xl transition-all duration-300 hover:bg-primary/10 group ">
      <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
        {icon}
      </div>
      <div className="flex-grow">
        <div className="text-sm font-medium text-muted-foreground group-hover:text-primary transition-colors duration-300">
          {label}
        </div>
        <div className="text-2xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {value} days
        </div>
      </div>
    </div>
  );
}
