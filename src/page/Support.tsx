import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faPaypal } from "@fortawesome/free-brands-svg-icons";
import { faStar, faPaperPlane } from "@fortawesome/free-solid-svg-icons";

import { Button } from "@/components/ui/button";
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

export default function SupportPage() {
  const [feedback, setFeedback] = useState("");
  const [feedbackType, setFeedbackType] = useState("suggestion");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setNavbarState(1));
  }, [dispatch]);

  const handleFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your feedback!", {
      id: "Support",
    });
    // try {
    //   await fetch("/api/send-feedback", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       type: feedbackType,
    //       message: feedback,
    //       email: "aryanbhat324@gmail.com",
    //     }),
    //   });
    //   toast.success("Thank you for your feedback!", {
    //     id: "Support",
    //   });
    //   setFeedback("");
    //   setFeedbackType("suggestion");
    // } catch (error) {
    //   toast.error(
    //     "There was an error submitting your feedback. Please try again."
    //   );
    // }
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.h1
          className="text-4xl font-bold text-center mb-8"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Support Habitify
        </motion.h1>

        <motion.section
          className="mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="bg-primary/5">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center justify-center">
                <FontAwesomeIcon icon={faGithub} className="mr-2" />
                Habitify on GitHub
              </CardTitle>
              <CardDescription className="text-center">
                Habitify is an open-source project. Your contributions make a
                difference!
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">
                We believe in the power of community and collaboration. By
                contributing to Habitify, you're helping to create a tool that
                benefits everyone.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="https://github.com/aryanbhat/habitify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button className="w-full">
                    <FontAwesomeIcon icon={faGithub} className="mr-2" />
                    View Repository
                  </Button>
                </a>
                <a
                  href="https://github.com/aryanbhat/habitify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto"
                >
                  <Button variant="outline" className="w-full">
                    <FontAwesomeIcon icon={faStar} className="mr-2" />
                    Star the Project
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          className="mb-12"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold mb-4">Why Support Us?</h2>
          <p className="mb-4">
            Your support helps us continue to improve and maintain Habitify.
            With your contribution, we can:
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
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Support Habitify</CardTitle>
              <CardDescription>
                Your donation helps keep Habitify free and continuously
                improving.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="https://paypal.me/AryanBhatIN"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button type="button" className="w-full">
                  <FontAwesomeIcon icon={faPaypal} className="mr-2" />
                  Donate with PayPal
                </Button>
              </a>
            </CardContent>
          </Card>
        </motion.section>

        <motion.section
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Share Your Thoughts</CardTitle>
              <CardDescription>
                We value your feedback. Let us know how we can improve Habitify!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleFeedback} className="space-y-4">
                <div>
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
                <div>
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
    </div>
  );
}
