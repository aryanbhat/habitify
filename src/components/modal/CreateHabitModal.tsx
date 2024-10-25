import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { habitSchema } from "@/schemas/habitSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { colors } from "@/constants/habitColor";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { InfoIcon } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import toast from "react-hot-toast";
import { fetchHabitsList } from "@/stores/habitSlice/habitSlice";

function CreateHabitModal() {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);
  const form = useForm<z.infer<typeof habitSchema>>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      title: "",
      type: "number",
      streak: true,
      longestStreak: false,
      total: false,
      color: "green",
      unit: "",
    },
  });

  async function onSubmit(values: z.infer<typeof habitSchema>) {
    const newHabit = {
      ...values,
      value: [],
    };
    try {
      const collectionRef = collection(db, `users/${user.uid}/habits`);
      const docRef = await addDoc(collectionRef, newHabit);
      console.log(docRef);

      await setDoc(
        doc(db, `users/${user.uid}/habits`, docRef.id),
        {
          id: docRef.id,
        },
        { merge: true }
      );
      if (user.uid) {
        dispatch(fetchHabitsList(user.uid));
      }
    } catch (error) {
      toast.error("failed to create the habit please try again");
      console.log(error);
    }

    setOpen(false);
  }

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      form.reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button>Create a Habit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create a Habit</DialogTitle>
          <DialogDescription>
            Define the Habit you want to track on your heatmap.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-5 flex flex-col"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Meditation"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Choose a title for your habit
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tracking Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkbox">
                          Checkbox (Done / Not Done)
                        </SelectItem>
                        <SelectItem value="number">
                          Number (Quantity/ Duration)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    Select how you'll measure this habit.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Measurement Unit</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="e.g, minutes, pages, times"
                      required
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Specify the unit you'll use to measure (e.g minutes
                    meditated)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="streak"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="streak"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <Label
                      htmlFor="streak"
                      className="flex gap-x-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Streak
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent
                            className="bg-foreground"
                            avoidCollisions={true}
                            side="right"
                          >
                            <p>Shows your current unbroken streak</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="longestStreak"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="longestStreak"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <label
                      htmlFor="longestStreak"
                      className="flex gap-x-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Longest streak
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent
                            className="bg-foreground"
                            avoidCollisions={true}
                            side="right"
                          >
                            <p>
                              Displays your longest streak achieved on the
                              heatmap
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="total"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        id="total"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <label
                      htmlFor="total"
                      className="flex gap-x-4 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Total entries
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <InfoIcon className="h-4 w-4" />
                          </TooltipTrigger>
                          <TooltipContent
                            className="bg-foreground"
                            avoidCollisions={true}
                            side="right"
                          >
                            <p>
                              Shows the total number of times you've completed
                              this habit
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </label>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Add Color(s)</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Color" />
                      </SelectTrigger>
                      <SelectContent className="h-48">
                        <ScrollArea>
                          {colors.map((elem: string) => (
                            <SelectItem key={elem} value={elem}>
                              <div className="flex items-center justify-between w-24 ">
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
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              Create Habit
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateHabitModal;
