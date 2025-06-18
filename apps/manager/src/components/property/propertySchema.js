import { z } from "zod";

export const propertySchema = z.object({
  id: z.number().int().nonnegative(),
  type: z.string().min(1, "Type is required"),
  name: z.string().min(1, "Name is required"),
  key: z.string().min(1, "Key is required"),
  // settings: z.record(z.any()).optional(), // Leave out for now as requested
});