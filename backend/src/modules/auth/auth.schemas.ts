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

export const FORGET_PASSWORD_DTO = z.object({
    email : z.string().trim().email().nonempty()
})

export const RESET_PASSWORD_DTO = z.object({
    token:z.string().trim().nonempty(),
    password:z.string().trim().length(6),
})

export type SIGN_UP_DTO = z.infer<typeof SIGN_UP_DTO>
export type SIGN_IN_DTO = z.infer<typeof SIGN_IN_DTO>
export type SIGN_OUT_DTO = z.infer<typeof SIGN_OUT_DTO>
export type FORGET_PASSWORD_DTO = z.infer<typeof FORGET_PASSWORD_DTO>
export type RESET_PASSWORD_DTO = z.infer<typeof RESET_PASSWORD_DTO>
