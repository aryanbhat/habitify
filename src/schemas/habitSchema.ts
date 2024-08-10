import z from "zod";

const validType = ["checkbox", "number"] as const;

const typeSchema = z.enum(validType);

const habitSchema = z.object({
  title: z.string(),
  type: typeSchema,
  streak: z.boolean(),
  longestStreak: z.boolean(),
  total: z.boolean(),
  color: z.string().array().nonempty(),
});

export { habitSchema };
