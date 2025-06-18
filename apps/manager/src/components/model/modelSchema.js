import { z } from "zod";

export const modelSchema = z.object({
  id: z.number().int().nonnegative(),
  type: z.string().min(1, "Type is required"),
  title: z.string().min(1, "Title is required"),
  key: z.string().min(1, "Key is required"),
});