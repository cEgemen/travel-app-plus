import { verifyAccessToken } from "@modules/auth/auth.utils";
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors";
import { NextFunction, Request, Response } from "express";

export const ROUTES = [
    "/health",
    "/api/auth/login",
    "/api/auth/register"
]

export const extractUser = (req : Request , res : Response , next : NextFunction) => {
        try {
          const path = req.url.split("/").filter(Boolean).join("/")
          if(ROUTES.includes(path))
          {
            next()
            return
          }
          const authorized = req.headers["authorized"] as string
          if(!authorized || !authorized.includes("Bearer"))
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
          req.user = decoded
          next()
        } catch (error) {
            next(new ApiError("Internal Server Error",STATUS_CODES.INTERNAL_SERVER_ERROR))
        } 
     }
