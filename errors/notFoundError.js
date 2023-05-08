import CustomAPIError from "./customError.js";
import httpStatusCodes from 'http-status-codes'

class NotFoundError extends CustomAPIError{
    constructor(message){
        super(message)
        this.statusCode = httpStatusCodes.NOT_FOUND
    }
}

export default NotFoundError