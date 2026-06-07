import z from "zod"

export const USER_UPDATE_DTO = z.object({
    username:z.optional(z.string().trim().min(3).max(20)),
    password:z.optional(z.string().trim().length(6)),
    email:z.optional(z.string().trim().email().nonempty()),
    roleId:z.optional(z.string().trim().nonempty()),
})

export const USER_CREATE_DTO = z.object({
    username:z.string().trim().min(3).max(20),
    password:z.string().trim().length(6),
    email:z.string().trim().email().nonempty(),
})

export type USER_CREATE_DTO = z.infer<typeof USER_CREATE_DTO>
export type USER_UPDATE_DTO = z.infer<typeof USER_UPDATE_DTO>