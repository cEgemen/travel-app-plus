import { NextFunction, Request, Response } from "express"
import z from "zod"

type SCHEMAS = {
    body?: z.ZodTypeAny,
    params?: z.ZodTypeAny,
    query?: z.ZodTypeAny,
}

type SOURCE_TYPE = "body" | "params" | "query"

export const validater = ({schemas,sourceType} : {schemas : SCHEMAS,sourceType:SOURCE_TYPE[]}) => {
    
    return (req:Request,res:Response,next:NextFunction)=>{
        try {
            
           Object.entries(schemas).forEach(([key,schema])=>{
                if(sourceType.includes(key as SOURCE_TYPE) && req[key as SOURCE_TYPE])
                {
                   const parseResult = schema.safeParse(req[key as SOURCE_TYPE])
                   if(!parseResult.success)
                    throw Error("bad request") 
                }
           }) 
           next()
        } catch (error) {
            return res.status(400).json({
                status:400,
                message:"bad request",
                success:false
            })
        }
    }
}