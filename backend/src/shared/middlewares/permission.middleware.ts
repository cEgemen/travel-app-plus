import { prisma } from "@config/db.config";
import redis from "@config/redis.config";
import { verifyAccessToken } from "@modules/auth/auth.utils";
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors";
import { NextFunction, Request, Response } from "express";

export const ROUTES = [
    "/health",
    "/api/auth/sign-in",
    "/api/auth/sign-up"
]

export const extractUser = async(req : Request , res : Response , next : NextFunction) => {
        try {
          const path = req.url
          if(ROUTES.includes(path))
          {
            next()
            return
          }
          const authorized = req.headers["authorization"] as string
          if(!authorized || !authorized.includes("Bearer "))
          {
            next(new ApiError("Unauthorized",STATUS_CODES.UN_AUTHORIZED))
            return
          } 
          const token = authorized.split(" ")[1]
          const decoded = verifyAccessToken(token) 
          if(!decoded)
          {
             next(new ApiError("Unauthorized",STATUS_CODES.UN_AUTHORIZED))
             return
          }
          const userId = decoded.id
          if(!userId && typeof userId !== "number")
          {
            next(new ApiError("Invalid User ID",STATUS_CODES.UN_AUTHORIZED))
            return
          }
          const isHaveSessionId = await prisma.user.findUnique({
            where : {
              id : userId
            },
            select : {
              sessionId : true
            }
          })
          if(!isHaveSessionId || !isHaveSessionId.sessionId)
          {
            next(new ApiError("Unauthorized",STATUS_CODES.UN_AUTHORIZED))
            return
          }
          const redisHavaSessionId = await redis.get("session:"+isHaveSessionId.sessionId)
          if(!redisHavaSessionId)
          {
            next(new ApiError("Unauthorized",STATUS_CODES.UN_AUTHORIZED))
            return
          }
          const refreshToken = JSON.parse(redisHavaSessionId).refreshToken
          const refreshIsWhite = await redis.get("w-" + isHaveSessionId.sessionId + ":" + refreshToken)
          if(!refreshIsWhite)
          {
            next(new ApiError("Unauthorized",STATUS_CODES.UN_AUTHORIZED))
            return
          }
          req.refreshToken = refreshToken
          req.user = decoded
          next()
        } catch (error) {
            next(new ApiError("Internal Server Error",STATUS_CODES.INTERNAL_SERVER_ERROR))
        } 
     }
   