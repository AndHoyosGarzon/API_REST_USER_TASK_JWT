import { z } from "zod";

const taskSchema = z.object({
  title: z.string({ required_error: "Title is required" }).min(4).max(250),
  description: z.string({ required_error: "Description is required" }).min(4),
});

export function validateDataTask(obj) {
  return taskSchema.safeParse(obj);
}

export function validatePartialTask(obj){
  return taskSchema.partial(obj)
}
