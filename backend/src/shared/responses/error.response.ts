import { STATUS_CODES } from "@shared/errors/api.errors";
import { Request, Response } from "express";

type ERROR_PAYLOAD = {
    statusCode : STATUS_CODES,
    message : string,
    meta : {
        path : string,
        method : string,
        timestamp : string,
    }
}

export const errorResponse = (res : Response,payload:ERROR_PAYLOAD) => {

    return res.status(payload.statusCode).json({
        statusCode : payload.statusCode,
        message : payload.message,
        success : false,
        meta : payload.meta,
        data : null
    })

}