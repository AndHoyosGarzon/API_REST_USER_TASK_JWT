import { z } from "zod";

const userSchema = z.object({
  firstname: z.string().min(3).max(100),
  lastname: z.string().min(3).max(100),
  email: z.string().email().min(5).max(100),
  password: z
    .string({
      invalid_type_error:
        "The password must have more than 4 characters and be alphanumerica",
      required_error: "Password is required",
    })
    .min(4)
    .max(250),
});

export function validateDataUser(obj) {
  return userSchema.safeParse(obj);
}

export function validatePartialUser(obj){
  return userSchema.partial(obj)
}