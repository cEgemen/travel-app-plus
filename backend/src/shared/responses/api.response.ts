import { STATUS_CODES } from "@shared/errors/api.errors";
import { Request, Response } from "express";
import { successResponse } from "./success.response";
import { errorResponse } from "./error.response";

type RESPONSE = {
    statusCode : STATUS_CODES
    message : string
    data : any | null
}

export const apiResponse = (req : Request,res : Response,payload : RESPONSE) => {

    const timestamp = Date.now().toLocaleString()
    const meta = {path:req.path,method:req.method,timestamp:timestamp}

    if(payload.statusCode >= 400)
    {
       return errorResponse(res,{statusCode:payload.statusCode,message:payload.message,meta:meta})
    } 
    else
    {
      return successResponse(res,{data:payload.data,message:payload.message,statusCode:payload.statusCode,meta:meta})
    }

}