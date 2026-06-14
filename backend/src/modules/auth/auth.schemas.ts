import z from "zod";

export const SIGN_UP_DTO = z.object({
    username: z.string().trim().min(3).max(20),
    email: z.string().trim().email().nonempty(),
    password: z.string().trim().length(6),
})

export const SIGN_IN_DTO = z.object({
    email: z.string().trim().email().nonempty(),
    password: z.string().trim().length(6),
})

export const SIGN_OUT_DTO = z.object({
    refreshToken : z.string().trim().nonempty(),
})

export type SIGN_UP_DTO = z.infer<typeof SIGN_UP_DTO>
export type SIGN_IN_DTO = z.infer<typeof SIGN_IN_DTO>
export type SIGN_OUT_DTO = z.infer<typeof SIGN_OUT_DTO>
