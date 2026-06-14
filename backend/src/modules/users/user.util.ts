import { prisma } from "@config/db.config"
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors"

export const isUserExistById = async (id: string | number) => {
    if ((typeof id === "string" && !id) || (typeof id === "number" && !id) || (typeof id === "string" && id.trim() === ""))
        throw new ApiError("Invalid User ID", STATUS_CODES.BAD_REQUEST)
    try {
        return await prisma.user.findUnique({
            where: {
                id: Number(id)
            }
        })
    } catch (error) {
        if (error instanceof ApiError)
            throw error
        throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
}

export const isUserExistByEmail = async (email: string) => {
    if (!email || email.trim() === "")
        throw new ApiError("Invalid User Email", STATUS_CODES.BAD_REQUEST)
    try {
        return await prisma.user.findUnique({
            where: {
                email:email
            }
        })
    } catch (error) {
        if (error instanceof ApiError)
            throw error
        throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
}