import { Request, Response } from "express";
import { signInService, signUpService , meService , signOutService , refreshService} from "./auth.service";
import { verifyRefreshToken, verifyToken } from "./auth.utils";

export const singInController = async (req: Request, res: Response) => {
    try {
        const userSignInData = req.body

        const result = await signInService(userSignInData)

        return res.status(200).json({status:200,message:"User Signedin Successfully",success:true})
    } catch (error) {
        console.log(" in signIn ->error ",error)
        return res.status(500).json({status:500,message:"Internal Server Error",success:false})
    }
}

export const signUpController = async(req: Request, res: Response) => {
    try {
        
        const userSignUpData = req.body

        const result = await signUpService(userSignUpData)
        
        return res.status(200).json({status:200,message:"User Signedup Successfully",success:true})
    } catch (error) {
        console.log(" in signUp ->error ",error)
        return res.status(500).json({status:500,message:"Internal Server Error",success:false})
    }
}

export const signOutController =async (req: Request, res: Response) => {
   try {
         /* const tokenPayload = req.tokenPayload
      await signOutService(tokenPayload) */
      return res.status(200).json({status:200,message:"User Signedout Successfully",success:true})
   } catch (error) {
    console.log(" in signOut ->error ",error)
    return res.status(500).json({status:500,message:"Internal Server Error",success:false})
   }
}


export const refreshController = async (req: Request, res: Response) => {
    try {
         const refreshToken = req.body.refreshToken
         /* 
             await refreshService(isValidRefreshToken)       
        */
       return res.status(200).json({status:200,message:"Refresh Token Verified Successfully",success:true})

    } catch (error) {
         console.log(" in refresh ->error ",error)
         return res.status(500).json({status:500,message:"Internal Server Error",success:false})
    }

}

export const meController = (req: Request, res: Response) => {
      try {
        
        /* 
           const userPayload = req.user
           const result = meService(userPayload)
           if(!result)
             return res.status(404).json({status:404,message:"User Not Found",success:false}) 
        */

        return res.status(200).json({status:200,message:"User Info Fetched Successfully",success:true})  

      } catch (error) {
        console.log(" in me ->error ",error)
        return res.status(500).json({status:500,message:"Internal Server Error",success:false})
      }
}