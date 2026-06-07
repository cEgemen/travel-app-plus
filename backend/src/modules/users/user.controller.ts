import { ApiError, STATUS_CODES } from "@shared/errors/api.errors";
import { apiResponse } from "@shared/responses/api.response";
import { Request, Response } from "express";
import service from "./user.service";


const getUsers = async (req : Request,res:Response) => {
  
    try {
        const result = await service.getUsers()  
        return apiResponse(req,res,{
             data : result,
             statusCode : STATUS_CODES.SUCCESS,
             message : "Users Fetched Successfully"
        })  
    } catch (error) {
        if(error instanceof ApiError)
        {
            return apiResponse(req,res,{
                statusCode : error.statusCode,
                message : error.message
            })  
        }
        return apiResponse(req,res,{
            statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR,
            message : "Internal Server Error"
        })
    }

}

const getUserById = async (req : Request,res:Response) => {
         
       try {
        const id = req.params.id
        const result = await service.getUserById(id)  
        return apiResponse(req,res,{
             data : result,
             statusCode : STATUS_CODES.SUCCESS,
             message : `User with ${id} fetched successfully`
        })  
    } catch (error) {
        if(error instanceof ApiError)
        {
            return apiResponse(req,res,{
                statusCode : error.statusCode,
                message : error.message
            })  
        }
        return apiResponse(req,res,{
            statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR,
            message : "Internal Server Error"
        })
    }


}

const createUser = async (req : Request,res:Response) => {

       try {
        const data = req.body
        const result = await service.createUser(data) 
        return apiResponse(req,res,{
             data : result,
             statusCode : STATUS_CODES.SUCCESS,
             message : "User Created Successfully"
        })  
    } catch (error) {
        if(error instanceof ApiError)
        {
            return apiResponse(req,res,{
                statusCode : error.statusCode,
                message : error.message
            })  
        }
        return apiResponse(req,res,{
            statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR,
            message : "Internal Server Error"
        })
    }
}

const updateUser = async (req : Request,res:Response) => {

       try {
        const id = req.params.id
        const data = req.body
        const result = await service.updateUserById(id,data)  
        return apiResponse(req,res,{
             data : result,
             statusCode : STATUS_CODES.SUCCESS,
             message : `User with ${id} updated successfully`
        })  
    } catch (error) {
        if(error instanceof ApiError)
        {
            return apiResponse(req,res,{
                statusCode : error.statusCode,
                message : error.message
            })  
        }
        return apiResponse(req,res,{
            statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR,
            message : "Internal Server Error"
        })
    }


}

const deleteUser = async (req : Request,res:Response) => {

       try {
        await service.deleteUserById(req.params.id) 
        return apiResponse(req,res,{
             data : {message : "User Deleted Successfully"},
             statusCode : STATUS_CODES.SUCCESS,
             message : "User Deleted Successfully"
        })  
    } catch (error) {
        if(error instanceof ApiError)
        {
            return apiResponse(req,res,{
                statusCode : error.statusCode,
                message : error.message
            })  
        }
        return apiResponse(req,res,{
            statusCode : STATUS_CODES.INTERNAL_SERVER_ERROR,
            message : "Internal Server Error"
        })
    }
}


export default{
     getUsers,
     getUserById,
     createUser,
     updateUser,
     deleteUser 
    }