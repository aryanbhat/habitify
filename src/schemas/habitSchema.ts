import z from "zod";

const validType = ["checkbox", "number"] as const;

const typeSchema = z.enum(validType);

const validColor = [
  "green",
  "blue",
  "orange",
  "purple",
  "pink",
  "yellow",
] as const;

const colorType = z.enum(validColor);

const habitSchema = z.object({
  title: z.string(),
  type: typeSchema,
  streak: z.boolean(),
  longestStreak: z.boolean(),
  total: z.boolean(),
  color: colorType,
});

export { habitSchema };
