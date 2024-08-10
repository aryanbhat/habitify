import { ResponsiveCalendar } from "@nivo/calendar";

export type dataType = {
  value: number;
  day: string;
};

type habitProps = {
  data: dataType[];
};

function HabitCalendar(props: habitProps) {
  const { data } = props;

  return (
    <div className=" lg:w-[80vw] h-[40vh] w-screen ">
      <ResponsiveCalendar
        data={data}
        from="2016-01-01"
        to="2016-07-12"
        emptyColor="#131D33"
        colors={["#9be9a8", "#40c463", "#30a14e", "#216e39"]}
        margin={{ top: 40, right: 40, bottom: 40, left: 40 }}
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
  );
}

export default HabitCalendar;
