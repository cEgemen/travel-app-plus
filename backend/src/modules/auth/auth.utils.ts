
import {sign,verify} from "jsonwebtoken"
import { JWT } from "@config/app.config"
import { Request } from "express"


export const generateAccessToken = (user : any) => {

    return sign({...user},JWT.accessSecret,{
        expiresIn : JWT.accessExpiresIn,
        algorithm : "HS512"
    })

}

export const generateRefreshToken = (user : any) => {
    return sign({...user},JWT.refreshSecret,{
        expiresIn : JWT.refreshExpiresIn,
        algorithm : "HS512"
    })
}

export const verifyAccessToken = (token : string) => {
    try {
     return verify(token,JWT.accessSecret)   
    } catch (error) {
      return null  
    }
    
}

export const verifyRefreshToken = (token : string) => {
    try {
     return verify(token,JWT.refreshSecret)   
    } catch (error) {
      return null  
    }
}

export const verifyToken = (req : Request) => {
     const authHeader : string | undefined = req.headers.authorization

     if(!authHeader || !authHeader.startsWith("Bearer"))
     {
        return null
     }

     const token = authHeader.split(" ")[1]

     try 
     {
        const decoded = verifyAccessToken(token)
        return decoded
     }
     catch(error)
     {
        console.log(" in verifyToken -> error ",error)
        return null
     }

}