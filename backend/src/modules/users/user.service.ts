import { prisma } from "@config/db.config"
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors"
import { USER_CREATE_DTO, USER_UPDATE_DTO } from "./user.schemas"
import { genSalt, hash } from "bcryptjs"


const isUserExist = async (id: string) => {
   if (!id || id.trim() === "")
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

const getUsers = async () => {
   try {
      const users = await prisma.user.findMany()
      return users
   } catch (error) {
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}

const getUserById = async (id: string) => {
   try {
      const isExist = await isUserExist(id)
      if (!isExist)
         throw new ApiError("User Not Found", STATUS_CODES.NOT_FOUND)
      return isExist
   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}

const deleteUserById = async (id: string) => {
   try {
      const isExist = await isUserExist(id)
      if (!isExist)
         throw new ApiError("User Not Found", STATUS_CODES.NOT_FOUND)
      await prisma.user.delete({
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

const updateUserById = async (id: string, data: USER_UPDATE_DTO) => {
   try {
      const isExist = await isUserExist(id)
      if (!isExist)
         throw new ApiError("User Not Found", STATUS_CODES.NOT_FOUND)
      if(data.password)
      {
         const salt = await genSalt(10)
         data.password = await hash(data.password,salt)
      }
      await prisma.user.update({
         where: {
            id: Number(id)
         },
         data: {
              username : data?.username || isExist.username,
              password : data?.password || isExist.password,
          }
      })
   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}

const createUser = async (data: USER_CREATE_DTO) => {
   try {
      await prisma.user.create({
         data: {
            ...data,
            accountActive: false,
            isLogin: false,
            roleId: 2,
         }
      })
   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}

export default {
   getUsers,
   getUserById,
   deleteUserById,
   updateUserById,
   createUser
}
