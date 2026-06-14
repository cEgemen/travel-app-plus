import { genSalt, hash, compare } from "bcryptjs"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@modules/auth/auth.utils"
import { randomUUID } from "crypto"
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors"
import { isUserExistByEmail, isUserExistById } from "@modules/users/user.util"
import { SIGN_IN_DTO, SIGN_UP_DTO } from "./auth.schemas"
import { prisma } from "@config/db.config"
import redis from "@config/redis.config"
import { JWT, REDIS } from "@config/app.config"

export const signUpService = async (data: SIGN_UP_DTO) => {
   try {
      const isExist = await isUserExistByEmail(data.email)

      if (isExist) {
         throw new ApiError("Email Already Exist", STATUS_CODES.BAD_REQUEST)
      }
      const salt = await genSalt(10);
      const hashedPassword = await hash(data.password, salt);
      const newUser = await prisma.user.create({
         data: {
            ...data,
            password: hashedPassword,
            accountActive: false,
            isLogin: false,
            roleId: 1
         }
      })
      return { username: newUser.username, email: newUser.email, role: newUser.roleId === 1 ? "ADMIN" : newUser.roleId === 2 ? "STANDARD" : "PREMIUM" }
   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}

export const signInService = async (data: SIGN_IN_DTO) => {
   try {
      const isExist = await isUserExistByEmail(data.email)
      if (!isExist) {
         throw new ApiError("User Not Found", STATUS_CODES.NOT_FOUND)
      }
      const comparePassword = await compare(data.password, isExist.password)
      if (!comparePassword) {
         throw new ApiError("Incorrect Password", STATUS_CODES.BAD_REQUEST)
      }

      const sessionId = randomUUID()
      const accessToken = generateAccessToken({...isExist, sessionId})
      const refreshToken = generateRefreshToken({...isExist, sessionId})
      await prisma.user.update({
         where: {
            id: isExist.id
         },
         data: {
            sessionId: sessionId
         }
      })
      await redis.set("w-" + sessionId + ':' + refreshToken, refreshToken, "EX", REDIS.sessionTTL)
      await redis.set("session:" + sessionId, JSON.stringify({ refreshToken, user: { id: isExist.id, username: isExist.username, email: isExist.email, password: isExist.password, roleId: isExist.roleId } }), "EX", JWT.refreshExpiresIn)
      return {
         user: { username: isExist.username, email: isExist.email, role: isExist.roleId === 1 ? "ADMIN" : isExist.roleId === 2 ? "STANDARD" : "PREMIUM" },
         accessToken,
         refreshToken,
      }

   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}
export const signOutService = async (id:number,sessionId: string, refreshToken: string) => {
   try {
      const delSessionRes = await redis.del("session:" + sessionId)
      console.log("||signOut|| delSessionRes : ", delSessionRes)
      const delRefreshRes = await redis.del("w-" + sessionId + ":" + refreshToken)
      console.log("||signOut|| delRefreshRes : ", delRefreshRes)
      await prisma.user.update({
         where: {
            id: id
         },
         data: {
            sessionId: null
         }
      })
   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}


export const refreshService = async (refreshTokenData: any) => {
   try {
      if (!refreshTokenData)
         throw new ApiError("Refresh Token is not provided", STATUS_CODES.BAD_REQUEST)
      const isValidRefreshToken = verifyRefreshToken(refreshTokenData)
      if (!isValidRefreshToken)
         throw new ApiError("Invalid Refresh Token", STATUS_CODES.BAD_REQUEST)
      const {exp,iat,...userPayload} = isValidRefreshToken as any
      const sessionId = userPayload.sessionId
      const redisSessionData = await redis.get("session:" + sessionId)
      if (!redisSessionData)
         throw new ApiError("Session Not Found", STATUS_CODES.BAD_REQUEST)
      const sessionData = JSON.parse(redisSessionData)
      if (sessionData.refreshToken !== refreshTokenData)
         throw new ApiError("Invalid Refresh Token", STATUS_CODES.BAD_REQUEST)

      const validRefresh = await redis.get("w-" + sessionId + ":" + refreshTokenData)
       if (!validRefresh)
         throw new ApiError("Invalid Refresh Token", STATUS_CODES.BAD_REQUEST)

      const delLastSession = await redis.del("session:" + sessionId)
      console.log("||refresh|| delLastSession : ", delLastSession)
      if (!delLastSession)
         console.log(" Session Not Found ")
      const delRefreshRes = await redis.del("w-" + sessionId + ":" + refreshTokenData)
      console.log("||refresh|| delRefreshRes : ", delRefreshRes)
      if (!delRefreshRes)
         console.log(" Refresh Token Not Found ")

      const newSessionId = randomUUID()
      const accessToken = generateAccessToken({...userPayload,sessionId:newSessionId})
      const refreshToken = generateRefreshToken({...userPayload,sessionId:newSessionId})

      await redis.set("w-" + newSessionId + ':' + refreshToken, refreshToken, "EX", REDIS.sessionTTL)
      await redis.set("session:" + newSessionId, JSON.stringify({ refreshToken, user: { id: userPayload.id, username: userPayload.username, email: userPayload.email, roleId: userPayload.roleId } }), "EX", JWT.refreshExpiresIn)
     
      await prisma.user.update({
         where: {
            id: userPayload.id
         },
         data: {
            sessionId: newSessionId
         }
      })
      
      return { accessToken, refreshToken }
   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}

export const meService = async (data: any) => {
   try {
      const isExist = await isUserExistById(data.id)  
      if (!isExist)
         throw new ApiError("User Not Found", STATUS_CODES.NOT_FOUND)
      const coverData = {...isExist,password : "******"}
      return coverData
   } catch (error) {
      if (error instanceof ApiError)
         throw error
      throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
   }
}