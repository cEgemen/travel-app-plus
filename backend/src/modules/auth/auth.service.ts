import { genSalt, hash , compare} from "bcryptjs"
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "@modules/auth/auth.utils"
import { randomUUID } from "crypto"
import { ApiError, STATUS_CODES } from "@shared/errors/api.errors"

export const signInService = async (data : any) => {

            /* 
               const isExist = prisma.users.findUnique({
                   where:{
                       email:registerData.email
                   }
               })
       
               if(isExist)
               {
                 throw new ApiError("Email Already Exist",STATUS_CODES.BAD_REQUEST)
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
}

export const signUpService = async (data : any) => {
        
        /* 
           const isExist = prisma.users.findUnique({
                where:{
                    email:data.email
                }
           })

           if(isExist)
           {
             throw new ApiError("User Already Exist",STATUS_CODES.BAD_REQUEST)
           }
           const comparePassword = await compare(data.password,isExist.password)
           if(!comparePassword)
           {
            throw new ApiError("Incorrect Password",STATUS_CODES.UNAUTHORIZED)
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
}

export const signOutService = async(data : any) => {
        /* 
             const sessionId = data.sessionId
             const delSessionRes = await redis.del("session:"+sessionId)
             if(!delSessionRes)
               console.log(" Session Not Found ")
             const delRefreshRes = await redis.del("w-"+sessionId+":"+refreshTokenData)
             if(!delRefreshRes)
               console.log(" Refresh Token Not Found ")
        */
}


export const refreshService = (refreshTokenData:any) => {
       if(!refreshTokenData)
            throw new ApiError("Refresh Token is not provided",STATUS_CODES.BAD_REQUEST)
         const isValidRefreshToken = verifyRefreshToken(refreshTokenData)
         if(!isValidRefreshToken)
            throw new ApiError("Invalid Refresh Token",STATUS_CODES.BAD_REQUEST) 

         /* 
             const sessionId = isValidRefreshToken.sessionId 
             const sessionData = await redis.get("session:"+sessionId)
             if(!sessionData)
                throw new ApiError("Session Not Found",STATUS_CODES.BAD_REQUEST)

             if(sessionData.refreshToken !== refreshTokenData)
                throw new ApiError("Invalid Refresh Token",STATUS_CODES.BAD_REQUEST)

             const validRefresh = await redis.get("w-"+sessionId+":"+refreshTokenData)
             if(!validRefresh)
                throw new ApiError("Invalid Refresh Token",STATUS_CODES.BAD_REQUEST)

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
}

export const meService = (data : any) => {
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
}