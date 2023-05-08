import CustomAPIError from "./customError.js";
import httpStatusCodes from 'http-status-codes'

class BadRequestError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = httpStatusCodes.BAD_REQUEST

    }
}

export default BadRequestError