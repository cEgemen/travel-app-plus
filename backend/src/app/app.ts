import express, { NextFunction, Request, Response } from "express"
import helmet from "helmet"
import cors from "cors"
import { apiResponse } from "@shared/responses/api.response"
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors"

const app = express()

app.use(helmet())
app.use(cors({
      origin:"*",
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      allowedHeaders: ["Content-Type", "Authorization"]
}))
app.use(express.json())
app.use(express.urlencoded({extended : true}))


app.get("/health",(req,res,next) => {
    return res.status(200).json({
        status : 200,
        message : "ok"
    })
})



app.use((req : Request,res : Response,next : NextFunction) => {
    return apiResponse(req,res,{
         statusCode : STATUS_CODES.SUCCESS,
         message : "Project Is Live",
         data : {
             health : "ok",
             processTime : process.uptime(),
             platform : process.platform,
             memoryUsage : process.memoryUsage(),
             cpuUsage : process.cpuUsage(),
         }
    })
})

app.use((err : Error,req : Request,res : Response,next : NextFunction) => {
   if(err instanceof ApiError)
   {
    return apiResponse(req,res,{
        statusCode : err.statusCode,
        message : err.message,
        data : null,
    })
   }
   return apiResponse(req,res,{
    statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR,
    message : "Internal Server Error",
    data : null,
   })
})

export default app