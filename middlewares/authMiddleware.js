import authError from '../errors/authError.js'
import jwt from 'jsonwebtoken'

const authUser =(req,res,next) =>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new authError('Authentication failed')

    }
    const token = authHeader.split(' ')[1]
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = {userId:payload.userId, name:payload.name}
        next()
    } catch (error) {
        throw new authError('Authentication failed')
    }
}

export default authUser