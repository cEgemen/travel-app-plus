import { ApiError, STATUS_CODES } from "@shared/errors/api.errors";
import { NextFunction, Request, Response } from "express";

const DEFAULT_LIMIT = 5
const DEFAULT_WINDOW_MS = 15 * 60 * 1000

type RATE_LIMIT = {
     limit? : number ,
     window_ms? : number
}

export const rateLimit = ({limit = DEFAULT_LIMIT , window_ms = DEFAULT_WINDOW_MS} : RATE_LIMIT) => {
    
    return (req : Request , res : Response , next : NextFunction) => {
        try {
          const ip = req.ip

          if(!ip){
             if(process.env.NODE_ENV === "development"){
                 return next()
             }
             return next(new ApiError("IP Not Found",STATUS_CODES.INTERNAL_SERVER_ERROR))
          }

          const key = `rate_limit:${ip}`
          /* 
             const count = await redis.incr(key)
             if(count === 1)
               redis.expire(key,window_ms)

             if(count > limit)
               return next(new ApiError("Too Many Requests",STATUS_CODES.TOO_MANY_REQUESTS))
          */
           next()
        } catch (error) {
            next(new ApiError("Internal Server Error",STATUS_CODES.INTERNAL_SERVER_ERROR))
        }
        
    }
}