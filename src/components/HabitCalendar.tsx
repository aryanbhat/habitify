import { CalendarIcon, TrendingUpIcon, BarChartIcon } from "lucide-react";
import { ResponsiveCalendar } from "@nivo/calendar";
import { HabitValue } from "@/Types/type";
import { useState } from "react";

export default function HabitCalendar(props: { data: HabitValue }) {
  const data: HabitValue = props.data;

  const [values, setValues] = useState(data.value);

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

  return (
    <div className="bg-card text-card-foreground rounded-xl border shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-semibold tracking-tight">{data.title}</h2>
        <div className="lg:w-[80vw] h-[40vh] w-screen bg-card-background bg-card cursor-pointer">
          <ResponsiveCalendar
            onClick={(date) => {
              const newValue = {
                day: date.day,
                value: 1,
              };
              setValues([...values, newValue]);
              // alert(date.day);
            }}
            data={values}
            from="2024-01-01"
            theme={theme}
            to="2024-12-31"
            emptyColor="#131D33"
            colors={["#9be9a8", "#40c463", "#30a14e", "#216e39"]}
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
          {data.longest_streak && (
            <StatCard
              icon={<TrendingUpIcon className="w-6 h-6" />}
              label="Longest Streak"
              value={data.longest_streak}
            />
          )}
          {data.curr_streak && (
            <StatCard
              icon={<CalendarIcon className="w-6 h-6" />}
              label="Current Streak"
              value={data.curr_streak}
            />
          )}
          {data.total_entries && (
            <StatCard
              icon={<BarChartIcon className="w-6 h-6" />}
              label="Total Entries"
              value={data.total_entries}
            />
          )}
        </div>
      </div>
    </div>
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
          {value}
        </div>
      </div>
    </div>
  );
}
