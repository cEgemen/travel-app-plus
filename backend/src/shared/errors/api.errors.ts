
export enum STATUS_CODES { 
      SUCCESS = 200 ,
      SUCCESS_CREATED = 201 ,
      SUCCESS_NO_CONTENT = 204 ,
      
      BAD_REQUEST = 400 ,
      UN_AUTHORIZED = 401 ,
      FORBIDDEN = 403 ,
      NOT_FOUND = 404 ,

      INTERNAL_SERVER_ERROR = 500 
}

export class ApiError extends Error{
    success : boolean
    message : string
    statusCode : STATUS_CODES
    
    constructor(message : string,statusCode : STATUS_CODES){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.success = false
    }

}