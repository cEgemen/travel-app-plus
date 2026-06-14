import { prisma } from "@config/db.config"
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors"
import { generateOTP } from "./verification.utils"

  
const validateAccountActivationService = async (userId:string,code:string)=>{
    const type = "EMAIL_VERIFY"
    const channel = "EMAIL"
    await verifyOTPService({userId:Number(userId),code,type,channel})  
}

const generateAccountActivationService = async (userId : string)=>{
    const type = "EMAIL_VERIFY"
    const channel = "EMAIL"
    
    const otp = generateOTP()
    await saveOTPService({
        channel,type,code:otp,userId:Number(userId)
    })
    return otp
}

const saveOTPService = async (data:CREATE_VERIFICATION_DTO)=>{
    try {
        const {userId,code,type,channel} = data
        const isExistOTP = await prisma.verificationCode.findFirst({
            where:{
                userId:userId,
                code:code,
                type:type,
                channel:channel
            }
        })
        let newOTP : any 
        if(isExistOTP)
         {
           newOTP = await prisma.verificationCode.update({
            where:{
                id:isExistOTP.id
            },
            data:{
                code:code,
                expiresAt: new Date(Date.now() + 1000 * 60 * 5),
                attempts:0,
                createdDate: new Date(),
                usedAt: null
            }
           })
         }
        else
        {
          newOTP = await prisma.verificationCode.create({
            data:{
                userId,
                code,
                type,
                channel,
                expiresAt: new Date(Date.now() + 1000 * 60 * 5),
                attempts:0,
                maxAttempts:5,
                createdDate: new Date()
            }
        })   
        } 
       
        return newOTP
    } catch (error) {
        throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
}

const verifyOTPService = async (data : VERIFY_OTP_DTO) => {
    try {
        const {userId,code,type,channel} = data
        const isOTPExist = await prisma.verificationCode.findFirst({
            where:{
                userId:userId,
                code:code,
                type:type,
                channel:channel
            }
        })
        if(!isOTPExist)
            throw new ApiError("OTP Not Found", STATUS_CODES.NOT_FOUND)
        if(isOTPExist.usedAt)
            throw new ApiError("OTP Already Used", STATUS_CODES.BAD_REQUEST)
        if(isOTPExist.expiresAt < new Date())
            throw new ApiError("OTP Expired", STATUS_CODES.BAD_REQUEST)
        if(isOTPExist.attempts >= isOTPExist.maxAttempts)
            throw new ApiError("OTP Max Attempts Reached", STATUS_CODES.BAD_REQUEST)
        await prisma.verificationCode.update({
            where:{
                id:isOTPExist.id
            },
            data:{
                attempts:isOTPExist.attempts + 1,
                usedAt: new Date()
            }
        })
    } catch (error) {
        if(error instanceof ApiError)
            throw error
        throw new ApiError("Internal Server Error", STATUS_CODES.INTERNAL_SERVER_ERROR)
    }
}

export {
    validateAccountActivationService,
    generateAccountActivationService
}