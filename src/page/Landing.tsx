import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CalendarValue, HabitValue } from "@/Types/type";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { auth } from "@/firebaseConfig";
import HabitCalendar from "@/components/LandingHabitCalendar";
import { useAppDispatch } from "@/hooks/reduxHook";

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [calendarValue, setCalendarValue] = useState<CalendarValue[]>([]);

  const handleRedirection = () => {
    dispatch(setNavbarState(2));
    navigate("/login");
  };

  const productivityQuotes = [
    "Productivity is being able to do things that you were never able to do before. – Franz Kafka",
    "The tragedy in life doesn’t lie in not reaching your goal. The tragedy lies in having no goal to reach. – Benjamin E. Mays",
    "Working on the right thing is probably more important than working hard. – Caterina Fake",
    "Efficiency is doing things right. Effectiveness is doing the right things. – Peter Drucker",
    "Where your attention goes, your time goes. – Idowu Koyenikan",
    "Knowledge is the source of wealth. Applied to tasks we already know, it becomes productivity. Applied to tasks that are new, it becomes innovation. – Peter Drucker",
    "Procrastination is the fear of success. – Denis Waitley",
    "Sometimes, things may not go your way, but the effort should be there every single night. – Michael Jordan",
    "If you spend too much time thinking about a thing, you’ll never get it done. – Bruce Lee",
    "The way to get started is to quit talking and begin doing. – Walt Disney",
    "Action is the foundational key to all success. – Pablo Picasso",
    "We have a strategic plan. It’s called doing things. – Herb Kelleher",
    "You see, in life, lots of people know what to do, but few people actually do what they know. – Tony Robbins",
    "Focus on being productive instead of busy. – Tim Ferriss",
    "The secret of getting ahead is getting started. – Mark Twain",
    "Time management is about life management. – Idowu Koyenikan",
    "Your mind is for having ideas, not holding them. – David Allen",
    "Don’t think about what can happen in a month or a year. Focus on the 24 hours in front of you. – Eric Thomas",
    "Touch paper only once. – Robert Allen",
    "Success is a lousy teacher. It seduces smart people into thinking they can’t lose. – Bill Gates",
    "What we fear doing most is usually what we most need to do. – Tim Ferriss",
    "Motivation is what gets you started. Habit is what keeps you going. – Jim Rohn",
    "Fall in love with the process, and the results will come. – Eric Thomas",
    "Starve your distraction and feed your focus. – Unknown",
    "What gets measured gets managed. – Peter Drucker",
    "Continuous improvement is better than delayed perfection. – Mark Twain",
    "Lost time is never found again. – Benjamin Franklin",
    "If you want something done, give it to a busy man. – Preston Sturges",
    "Plans are nothing; planning is everything. – Dwight D. Eisenhower",
    "Practice isn’t the thing you do once you’re good. It’s the thing you do that makes you good. – Malcolm Gladwell",
    "Life’s gardeners pluck the weeds and care only for the productive plants. – Bryant McGill",
    "It’s not always that we need to do more but rather that we need to focus on less. – Nathan W. Morris",
    "Soon is not as good as now. – Seth Godin",
    "The true price of anything you do is the amount of time you exchange for it. – Henry David Thoreau",
    "Busy is a decision. – Debbie Millman",
    "Improved productivity means less human sweat, not more. – Henry Ford",
    "The least productive people are usually the ones who are most in favor of holding meetings. – Thomas Sowell",
    "You miss 100% of the shots you don’t take. – Wayne Gretzky",
    "Either you run the day or the day runs you. – Jim Rohn",
    "Problems become opportunities when the right people join together. – Robert Redfort",
    "The only way to achieve the impossible is to believe it is possible. – Charles Kingsleigh",
    "Action breeds confidence and courage. – Dale Carnegie",
    "The best way to predict the future is to create it. – Peter Drucker",
    "Success is the sum of small efforts, repeated day in and day out. – Robert Collier",
  ];

  useEffect(() => {
    dispatch(setNavbarState(0));

    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/habits");
      }
    });

    // Function to generate dates between start and end
    function getDates(startDate: Date, endDate: Date) {
      const dates = [];
      let currentDate = new Date(startDate);
      const lastDate = new Date(endDate);

      while (currentDate <= lastDate) {
        dates.push(new Date(currentDate));
        currentDate.setDate(currentDate.getDate() + 1);
      }

      return dates;
    }

    const allDates2024 = getDates(
      new Date(`${new Date().getFullYear()}-01-01`),
      new Date(`${new Date().getFullYear()}-12-31`)
    );

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const updatedCalendarValue: CalendarValue[] = [
      {
        day: "2024-01-20",
        value: 10,
        journal:
          productivityQuotes[
            Math.floor(Math.random() * productivityQuotes.length)
          ],
      },
    ];

    allDates2024.forEach((date) => {
      if (date >= today) return;
      const dateString = date.toISOString().split("T")[0];
      if (!updatedCalendarValue.some((item) => item.day === dateString)) {
        updatedCalendarValue.push({
          day: dateString,
          value: Math.floor(Math.random() * 10) + 1,
          journal:
            productivityQuotes[
              Math.floor(Math.random() * productivityQuotes.length)
            ],
        });
      }
    });
    setCalendarValue(updatedCalendarValue);

    return () => unsubscribe();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const calendarData: HabitValue = {
    title: "The one thing you always wanted to do",
    longestStreak: true,
    streak: true,
    total: true,
    value: calendarValue as CalendarValue[],
    color: "coral",
    type: "number",
    unit: "hours",
    id: "asdfiw12323",
  };

  return (
    <div className="min-h-screen text-foreground">
      <motion.div
        className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary mb-6 leading-tight">
            Transform Your Habits,
            <br />
            Elevate Your Life
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Visualize your progress, gain insights, and achieve your goals with
            our intuitive habit tracking platform.
          </p>
          <Button
            onClick={handleRedirection}
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Start Your Journey
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          <FeatureCard
            icon="📊"
            title="Visual Habit Tracking"
            description="See your progress at a glance with intuitive calendar heat maps."
          />
          <FeatureCard
            icon="📈"
            title="Insightful Analytics"
            description="Gain deep insights into your habits with customizable statistics and trends."
          />
          <FeatureCard
            icon="📓"
            title="Daily Journaling"
            description="Reflect on your habits with built-in journaling to track your thoughts and progress."
          />
        </motion.div>

        {calendarValue.length > 0 && (
          <motion.div
            className="mb-16 flex flex-col items-center"
            variants={itemVariants}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
              Visualize Your Progress
            </h2>
            <div className="w-[90vw] max-w-[1400px] min-w-[300px]">
              <HabitCalendar data={calendarData} />
            </div>
          </motion.div>
        )}

        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
            Why Choose Our Habit Tracker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitItem
              icon="✨"
              title="Intuitive Interface"
              description="Easy-to-use design that makes habit tracking a seamless part of your day."
            />
            <BenefitItem
              icon="🎨"
              title="Fully Customizable"
              description="Tailor your habit tracking experience to fit your unique lifestyle and goals."
            />
            <BenefitItem
              icon="🧠"
              title="Data-Driven Insights"
              description="Unlock valuable insights into your habits and behaviors to drive personal growth."
            />
            <BenefitItem
              icon="🌐"
              title="Cross-Platform Access"
              description="Track your habits on any device, ensuring consistency wherever you go."
            />
          </div>
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of users who have already improved their lives with
            our powerful habit tracking tools.
          </p>
          <Button
            onClick={handleRedirection}
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Get Started Now
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      className="bg-card text-card-foreground rounded-2xl shadow-lg p-8 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
    >
      <div className="relative z-10">
        <span className="text-4xl mb-4 block">{icon}</span>
        <h2 className="text-2xl font-semibold mb-3">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
    </motion.div>
  );
}

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1 text-2xl mr-4">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
