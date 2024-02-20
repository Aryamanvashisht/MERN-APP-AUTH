import jwt from 'jsonwebtoken'
import ENV from '../config.js'

export default async function Auth(req,res,next){
      
    try 
    {
        const token = req.headers.authorization.split(' ')[1]
        //retrieve details of the logged in user
        const decodedtoken = jwt.verify(token,ENV.JWT_SECRET)
        req.user = decodedtoken
        next()

    } catch (error) {
        return res.status(401).json({error:"Authentication failed...!"})
    }
}




export const localVariables = (req,res,next)=>{
         req.app.locals = {
            OTP:null,
            resetSession:false
         }
         next()
}