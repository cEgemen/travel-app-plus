import { Request, Response } from "express";
import { signInService, signUpService, meService, signOutService, refreshService, forgetPasswordService, resetPasswordService } from "./auth.service";
import { ApiError } from "@shared/errors/api.errors";
import { apiResponse } from "@shared/responses/api.response";
import { STATUS_CODES } from "@shared/errors/api.errors";

export const signInController = async (req: Request, res: Response) => {
    try {
        const userSignInData = req.body 
        const result = await signInService(userSignInData)
        return apiResponse(req, res, { data:result,
            message: "User Signedin Successfully",
            statusCode: STATUS_CODES.SUCCESS
        })
    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, { message: error.message, statusCode: error.statusCode })
        }
        return apiResponse(req, res, { message: "Internal Server Error", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
}

export const signUpController = async (req: Request, res: Response) => {
    try {

        const userSignUpData = req.body

        const result = await signUpService(userSignUpData)
         
        return apiResponse(req, res, { data: result, message: "User Signedup Successfully", statusCode: STATUS_CODES.SUCCESS })
    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, { message: error.message, statusCode: error.statusCode })
        }
        return apiResponse(req, res, { message: "Internal Server Error", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
}

export const signOutController = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const user = req.user as any
        await signOutService(user?.id as number,user?.sessionId || ""  , data.refreshToken as string)
        return apiResponse(req, res, { message: "User Signedout Successfully", statusCode: STATUS_CODES.SUCCESS })
    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, { data: null, message: error.message, statusCode: error.statusCode })
        }
        return apiResponse(req, res, { data: null, message: "Internal Server Error", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
}
 

export const refreshController = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.refreshToken as string
        const { accessToken, refreshToken: newRefreshToken } = await refreshService(refreshToken)

        return apiResponse(req, res, { data: { accessToken, refreshToken: newRefreshToken }, message: "Refresh Token Verified Successfully", statusCode: STATUS_CODES.SUCCESS })

    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, { data: null, message: error.message, statusCode: error.statusCode })
        }
        return apiResponse(req, res, { data: null, message: "Internal Server Error", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
}

export const meController = async (req: Request, res: Response) => {
    try {
        const userPayload = req.user as any
        const result = await meService(userPayload)
        return apiResponse(req, res, { data: result, message: "User Info Fetched Successfully", statusCode: STATUS_CODES.SUCCESS })

    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, { message: error.message, statusCode: error.statusCode })
        }
        return apiResponse(req, res, { message: "Internal Server Error", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
} 

export const forgetPasswordController = async (req : Request , res : Response ) => {
    try{
        const {email} = req.body
        const forgetToken = await forgetPasswordService(email as string)
        return apiResponse(req, res, { data: forgetToken, message: "Code sent to your email Successfully", statusCode: STATUS_CODES.SUCCESS })
    }
    catch(error){
        if (error instanceof ApiError) {
            return apiResponse(req, res, { message: error.message, statusCode: error.statusCode })
        }
        return apiResponse(req, res, { message: "Internal Server Error", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
}

export const resetPasswordController = async (req : Request , res : Response ) => {
    try{
        const {token,password} = req.body
        await resetPasswordService(token as string,password as string)
        return apiResponse(req, res, { message: "Password Reset Successfully", statusCode: STATUS_CODES.SUCCESS })
    }
    catch(error){
        if (error instanceof ApiError) {
            return apiResponse(req, res, { message: error.message, statusCode: error.statusCode })
        }
        return apiResponse(req, res, { message: "Internal Server Error", statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR })
    }
}