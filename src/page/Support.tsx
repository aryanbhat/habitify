import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import toast from "react-hot-toast";
import { useAppDispatch } from "@/hooks/reduxHook";
import { setNavbarState } from "@/stores/navbarSlice/navbarSlice";
import Footer from "@/components/Footer";

export default function SupportPage() {
  const [amount, setAmount] = useState("");
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("suggestion");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNavbarState(1));
  });

  const handleDonation = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with a payment processor
    toast.success(
      `Thank you for being so kind for dontaing ${amount} $, I have no paywall added right now`
    );
    setAmount("");
  };

  const handleFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would handle the feedback submission
    toast.success("feedback submitted");
    setFeedback("");
    setFeedbackType("suggestion");
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-2 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Support the Habit Tracker
        </motion.h1>

        <motion.section
          className="mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Why Support Us?</h2>
          <p className="mb-4">
            Your support helps us continue to improve and maintain the Habit
            Tracker app. With your contribution, we can:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Develop new features to enhance your habit tracking experience
            </li>
            <li>Improve app performance and stability</li>
            <li>Provide timely support and bug fixes</li>
            <li>Keep the app ad-free and focused on your needs</li>
          </ul>
          <p>
            Every contribution, no matter the size, makes a difference. Thank
            you for considering supporting our work!
          </p>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Make a Donation</CardTitle>
              <CardDescription>
                Your support keeps us going. Choose any amount you're
                comfortable with.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDonation}>
                <div className="mb-4">
                  <Label htmlFor="amount">Donation Amount ($)</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <FontAwesomeIcon icon={faHeart} className="mr-2" />
                  Donate
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Share Your Thoughts</CardTitle>
              <CardDescription>
                We value your feedback. Let us know how we can improve!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedback}>
                <div className="mb-4">
                  <Label htmlFor="feedbackType">Feedback Type</Label>
                  <RadioGroup
                    id="feedbackType"
                    value={feedbackType}
                    onValueChange={setFeedbackType}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="suggestion" id="suggestion" />
                      <Label htmlFor="suggestion">Suggestion</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="bug" id="bug" />
                      <Label htmlFor="bug">Bug Report</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="other" id="other" />
                      <Label htmlFor="other">Other</Label>
                    </div>
                  </RadioGroup>
                </div>
                <div className="mb-4">
                  <Label htmlFor="feedback">Your Feedback</Label>
                  <Textarea
                    id="feedback"
                    placeholder="Share your thoughts..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
                  Submit Feedback
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.section>
      </div>
      <Footer />
    </div>
  );
}
