import z from "zod";

export const signInSchema = z.object({
    userName: z.string().trim().min(3).max(20),
    email: z.string().trim().email().nonempty(),
    password: z.string().trim().length(6),
})

export const signUpSchema = z.object({
    email: z.string().trim().email().nonempty(),
    password: z.string().trim().length(6),
})