import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faChartLine,
  faClock,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import { auth } from "@/firebaseConfig";
import HabitCalendar from "@/components/LandingHabitCalendar";
import { useAppDispatch } from "@/hooks/reduxHook";
import { CalendarValue, HabitValue } from "@/Types/type";

export default function LandingPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [calendarValue, setCalendarValue] = useState<CalendarValue[]>([]);

  const handleRedirection = () => {
    dispatch(setNavbarState(2));
    navigate("/login");
  };

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
        journal: "something good should be here",
      },
    ];

    allDates2024.forEach((date) => {
      if (date >= today) return;
      const dateString = date.toISOString().split("T")[0];
      if (!updatedCalendarValue.some((item) => item.day === dateString)) {
        updatedCalendarValue.push({
          day: dateString,
          value: Math.floor(Math.random() * 10) + 1, // Random value between 1 and 100
          journal: "something good should be here",
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

  // const calendarValue = [{ day: "2024-01-01", value: 1 }];

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
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8 flex flex-col justify-center items-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center text-primary mb-8"
          variants={itemVariants}
        >
          Elevate Your Productivity
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl lg:text-2xl text-center text-muted-foreground mb-12"
          variants={itemVariants}
        >
          Track your habits with beautiful calendar heat maps and customizable
          statistics.
        </motion.p>
        <motion.div
          className="flex justify-center mb-16"
          variants={itemVariants}
        >
          <Button
            onClick={handleRedirection}
            size="lg"
            className="flex items-center justify-center gap-2 text-lg"
          >
            <span>Start Your Journey</span>
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
        >
          <FeatureCard
            icon={faCalendarAlt}
            title="Visual Habit Tracking"
            description="See your progress at a glance with intuitive calendar heat maps."
          />
          <FeatureCard
            icon={faChartLine}
            title="Insightful Analytics"
            description="Gain deep insights into your habits with customizable statistics and trends."
          />
          <FeatureCard
            icon={faClock}
            title="Build Lasting Habits"
            description="Stay motivated and consistent with streak tracking and reminders."
          />
        </motion.div>

        {calendarValue.length > 0 && (
          <motion.div className="mb-16 " variants={itemVariants}>
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              See Your Progress in Action
            </h2>
            <div className="w-[80vw] ">
              <div className="w-[81vw]">
                <HabitCalendar data={calendarData} />
              </div>
            </div>
          </motion.div>
        )}

        <motion.div className="mb-16" variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Why Choose Our Habit Tracker?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <BenefitItem
              icon={faCheck}
              title="Easy to Use"
              description="Intuitive interface that makes habit tracking a breeze."
            />
            <BenefitItem
              icon={faCheck}
              title="Customizable"
              description="Tailor your habit tracking experience to your specific needs."
            />
            <BenefitItem
              icon={faCheck}
              title="Data-Driven Insights"
              description="Gain valuable insights into your habits and behaviors."
            />
            <BenefitItem
              icon={faCheck}
              title="Cross-Platform"
              description="Access your habits on any device, anytime, anywhere."
            />
          </div>
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Habits?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8">
            Join thousands of users who have already improved their lives with
            our habit tracker.
          </p>
          <Button
            onClick={handleRedirection}
            size="lg"
            className="flex items-center justify-center gap-2 text-lg mx-auto"
          >
            <span>Get Started Now</span>
            <FontAwesomeIcon icon={faArrowRight} />
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
  icon: any;
  title: string;
  description: string;
}) {
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      className="bg-card text-card-foreground rounded-lg shadow-lg p-6 transition-all duration-300 hover:shadow-xl relative overflow-hidden group"
      whileHover={{ scale: 1.05 }}
      variants={itemVariants}
    >
      <div className="relative z-10">
        <FontAwesomeIcon icon={icon} className="text-4xl text-primary mb-4" />
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />
    </motion.div>
  );
}

function BenefitItem({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start">
      <div className="flex-shrink-0 mt-1">
        <FontAwesomeIcon icon={icon} className="text-2xl text-primary" />
      </div>
      <div className="ml-4">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
