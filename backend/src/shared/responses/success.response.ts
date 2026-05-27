import { STATUS_CODES } from "@shared/errors/api.errors"
import { Response } from "express"

export type SUCCESS_PAYLOAD = {
   statusCode : STATUS_CODES,
   message?:string,
   data : any | null,
   meta : {
    path : string,
    method : string,
    timestamp : string,
   }
}


export const successResponse = (res : Response,payload : SUCCESS_PAYLOAD) => {
    return res.status(payload.statusCode).json({
        statusCode : payload.statusCode,
        message : payload.message,
        success : true,
        data : payload.data,
        meta : payload.meta
    })
}