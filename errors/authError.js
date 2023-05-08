import CustomAPIError from "./customError.js";
import httpStatusCodes from 'http-status-codes'

class UnauthenticateError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = httpStatusCodes.UNAUTHORIZED
    }
}

export default UnauthenticateError