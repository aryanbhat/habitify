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
// import { InputTags } from "../ui/inputTags";
import { colors } from "@/constants/habitColor";

function CreateHabitModal() {
  const form = useForm<z.infer<typeof habitSchema>>({
    resolver: zodResolver(habitSchema),
    defaultValues: {
      title: "",
      type: "checkbox",
      streak: true,
      longestStreak: false,
      total: false,
      color: "green",
    },
  });

  async function onSubmit(values: z.infer<typeof habitSchema>) {
    const newHabit = {
      ...values,
      value: [],
    };
    console.log(newHabit);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Create a Habit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a Habit</DialogTitle>
          <DialogDescription>
            Enter the details of the Habit you want to track
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" space-y-7 flex flex-col"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className=" flex flex-col">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Meditation" {...field} />
                  </FormControl>
                  <FormDescription>
                    This will be the title for you habit{" "}
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
                  <FormLabel>Type</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checkbox">Checkbox</SelectItem>
                        <SelectItem value="number">Number</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
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
                        // {...field}
                      />
                    </FormControl>
                    <Label
                      htmlFor="streak"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Streak
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
                        // {...field}
                      />
                    </FormControl>
                    <label
                      htmlFor="longestStreak"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Longest streak
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
                        // {...field}
                      />
                    </FormControl>
                    <label
                      htmlFor="total"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Total entries
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
                      <SelectContent>
                        {colors.map((elem: string) => {
                          return (
                            <SelectItem value={elem}>
                              <div className=" flex items-center justify-between w-24 ">
                                <span>{elem}</span>
                                <div
                                  className=" h-4 w-4 rounded-xl"
                                  style={{
                                    backgroundColor: elem,
                                  }}
                                ></div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  {/* <FormDescription>...</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className=" w-full">
              Create Habit
            </Button>
          </form>
        </Form>
        {/* <DialogFooter>
          
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}

export default CreateHabitModal;
