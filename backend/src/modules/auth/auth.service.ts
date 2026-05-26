import { genSalt, hash , compare} from "bcryptjs"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@modules/auth/auth.utils"
import { randomUUID } from "crypto"

export const signInService = async (data : any) => {

    try {
            /* 
               const isExist = prisma.users.findUnique({
                   where:{
                       email:registerData.email
                   }
               })
       
               if(isExist)
               {
                 return res.status(400).json({status:400,message:"Email Already Exists",success:false}) 
               }
               const salt = await genSalt(10);
               const hashedPassword = await hash(password, salt);
               const newUser = await prisma.users.create({
                   data:{
                       ...registerData,
                       password:hashedPassword
                   }
               })
            */ 
    } catch (error) {
        console.log(" in signInService ->error ",error)
        throw error   
    }
}

export const signUpService = async (data : any) => {
    try {
        
        /* 
           const isExist = prisma.users.findUnique({
                where:{
                    email:data.email
                }
           })

           if(isExist)
           {
             return {status:404,message:"User Not Found",success:false} 
           }
           const comparePassword = await compare(data.password,isExist.password)
           if(!comparePassword)
           {
            return {status:401,message:"Incorrect Password",success:false}
           }
           
           const accessToken = generateAccessToken(isExist)
           const refreshToken = generateRefreshToken(isExist)

           const sessionId = randomUUID()

           await redis.set("w-"+sessionId+':'+refreshToken,refreshToken,"EX",REDIS.sessionExpiresIn
           )
           await redis.set("session:"+sessionId,{...},"EX",JWT.refreshExpiresIn)

           return {
             user : {...},
             accessToken ,
             refreshToken,  
           }
          
        */

    } catch (error) {
        console.log(" in signUpService ->error ",error)
        throw error
    }
}

export const signOutService = async(data : any) => {
    try {
        /* 
             const sessionId = data.sessionId
             const delSessionRes = await redis.del("session:"+sessionId)
             if(!delSessionRes)
               console.log(" Session Not Found ")
             const delRefreshRes = await redis.del("w-"+sessionId+":"+refreshTokenData)
             if(!delRefreshRes)
               console.log(" Refresh Token Not Found ")
        */
    } catch (error) {
        console.log(" in signOutService ->error ",error)
        throw error
    }
}


export const refreshService = (refreshTokenData:any) => {
    try {
       if(!refreshTokenData)
            throw Error("Refresh Token is not provided")
         const isValidRefreshToken = verifyRefreshToken(refreshTokenData)
         if(!isValidRefreshToken)
            throw Error("Invalid Refresh Token") 

         /* 
             const sessionId = isValidRefreshToken.sessionId 
             const sessionData = await redis.get("session:"+sessionId)
             if(!sessionData)
                throw Error("Session Not Found")

             if(sessionData.refreshToken !== refreshTokenData)
                throw Error("Invalid Refresh Token")

             const validRefresh = await redis.get("w-"+sessionId+":"+refreshTokenData)
             if(!validRefresh)
                throw Error("Invalid Refresh Token")

             const delLastSession = await redis.del("session:"+sessionId)
             if(delLastSession)
               console.log(" Refresh Token Not Found ")
             const delRefreshRes = await redis.del("w-"+sessionId) 
             if(!delRefreshRes)
               console.log(" Refresh Token Not Found ")
             const accessToken = generateAccessToken(isValidRefreshToken.user)
             const refreshToken = generateRefreshToken(isValidRefreshToken.user)
             const newSessionId = randomUUID()
             redis.set("w-"+newSessionId+':'+refreshToken,refreshToken,"EX",JWT.refreshExpiresIn)
             redis.set("session:"+newSessionId,{...},"EX",REDIS.SESSION_EXPIRES_IN)
             return {accessToken , refreshToken } 
         */

    } catch (error) {
        console.log(" in refreshService ->error ",error)
        throw error
    }
}

export const meService = (data : any) => {
    try {
       /* 
          const isExist = prisma.users.findUnique({
             where  : {
                id : data.id 
                      }
          })
          if(!isExist)
          {
           return null
           }
          return isExist  
       */  
    } catch (error) {
        console.log(" in meService ->error ",error)
        throw error
    }
}