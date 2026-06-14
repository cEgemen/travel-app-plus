import { ApiError, STATUS_CODES } from "@shared/errors/api.errors"
import { apiResponse } from "@shared/responses/api.response"
import { Request, Response } from "express"
import { validateAccountActivationService,generateAccountActivationService, verifyOTPService } from "./verification.service"
import { isUserExistByEmail } from "@modules/users/user.util"

const validateAccountActivationController = async (req: Request, res: Response) => {
    try {
        const { code } = req.body
        const user: any = req.user
        await validateAccountActivationService({userId:Number(user.id),code})
        return apiResponse(req,res,{
            statusCode:STATUS_CODES.SUCCESS,
            message:"Account Activation Successful"
        })
    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, {
                statusCode: error.statusCode,
                message: error.message
            })
        }
        return apiResponse(req, res, {
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        })
    }
}

const generateAccountActivationController = async (req: Request, res: Response) => {
     try {
        const user: any = req.user
        const otp = await generateAccountActivationService({id:Number(user.id)})
        console.log("||generateAccountActivationController|| otp : ", otp)
        // EMAIL SEND LOGIC WILL BE HERE
        return apiResponse(req,res,{
            statusCode:STATUS_CODES.SUCCESS,
            message:"OTP Generated Successfully"
        })
    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, {
                statusCode: error.statusCode,
                message: error.message
            })
        }
        return apiResponse(req, res, {
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        })
    }
}

const verifyOTPController = async (req: Request, res: Response) => {
    try {
        const { code,email } = req.body
        const isExistUser = await isUserExistByEmail(email)
        if (!isExistUser) {
            throw new ApiError("User Not Found", STATUS_CODES.NOT_FOUND)
        }
        await verifyOTPService({userId:Number(isExistUser.id),code,type:"PASSWORD_RESET",channel:"EMAIL"})
        
        return apiResponse(req,res,{
            statusCode:STATUS_CODES.SUCCESS,
            message:"OTP Verified Successfully"
        })
    } catch (error) {
        if (error instanceof ApiError) {
            return apiResponse(req, res, {
                statusCode: error.statusCode,
                message: error.message
            })
        }
        return apiResponse(req, res, {
            statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
            message: "Internal Server Error"
        })
    }
}

export {
    validateAccountActivationController,
    generateAccountActivationController,
    verifyOTPController
}