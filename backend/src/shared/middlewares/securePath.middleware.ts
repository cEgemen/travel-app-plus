import { ApiError, STATUS_CODES } from "@shared/errors/api.errors";
import { NextFunction, Request, Response } from "express";

const isStartWithApi = (path : string,allowedModules:string[]) => {
 
     if(!path || !path.trim())
     {
        return false
     }
     
     const splitPaths = path.split('/').filter(Boolean)

     if(allowedModules.length > 0)
     {
        if(allowedModules.includes(splitPaths[1]))
            return true
     }

     if(splitPaths[1] !== "api")
        return false
     
     return true
}

export const securePath = (req : Request,res : Response,next : NextFunction) => {

    const path = req.path

    const isApiRoute = isStartWithApi(path,[])

    if(!isApiRoute)
       next(new ApiError("Invalid Path",STATUS_CODES.BAD_REQUEST))    
 
   
   next() 
} 