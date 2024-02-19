import UserModal from "../model/User.modal.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import ENV from '../config.js'
import OTPgenerator from 'otp-generator'
import {jwtDecode} from 'jwt-decode'

/** Middleware to verify the user*/
export const verifyUser = async (req,res,next)=>{
      try
      {
         const{username} = req.method === 'GET' ? req.query : req.body;
         //check user existence
         let userexist = await UserModal.findOne({username})
         if(!userexist) return res.status(404).send({error:"Can't find the user"})
         next()
      }
      catch(err){
        return res.status(404).send({err:"Authentication failed!"})
      }
}

export const register = async (req, res) => {
    try {
      const { username, password, profile, email } = req.body;
  
      // Check existing username
      const existUsername =  UserModal.findOne({ username });
      // Check for existing email
      const existEmail =  UserModal.findOne({ email });
  
      await Promise.all([existUsername, existEmail]);
  
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
  
        const user = new UserModal({
          username,
          password: hashedPassword,
          profile: profile || '',
          email: email,
        });
  
        await user.save();
        res.status(201).send({ message: 'User registered successfully' });
      }
    } 
    catch (error) {
      res.status(500).send({ error: 'Unable to register user', details: error.message });
    }
  };

export const login = async (req, res) => {

     try
     {
        const{username,password} = req.body;
        UserModal.findOne({username})
        .then(user=>{
             bcrypt.compare(password,user.password)
             .then(passwordcheck=>{
                if(!passwordcheck) return res.status(500).send({error:"password doesn't match"})

                /** jwt*/
                const token = jwt.sign({
                    userId:user._id,
                    username:user.username,
                },ENV.JWT_SECRET,{expiresIn:"24h"})

                return res.status(200).send({
                    message:"Login successfully",
                    username:user.username,
                    token
                })

             })
             .catch(err=>res.status(500).send(`password doesn't match ${err}`)  )
        })
     }
     catch(err)
     {
        return res.status(500).send(`koi dikkat aa gayi ${err}`)
     }
}

export const getUser = async (req, res) => {
    const { username } = req.params;

    try {
        if (!username) return res.status(501).send({ error: "Invalid User" });

        const user = await UserModal.findOne({ username });

        if (!user) return res.status(501).send({ error: "Can't find the user pagal" });
        
        //mongoose returns the unnecessary data with object so convert it into JSON
        const{password,...rest} = Object.assign({},user.toJSON())

        return res.status(200).send(rest);
    } catch (err) {
        return res.status(500).send({ error: "Error finding the user", details: err.message });
    }
};

export const updateUser = async (req, res) => {
  try {
    //   const { id } = req.query;
         const {userId} = req.user
      if (userId) {
          const body = req.body;
          const result = await UserModal.updateOne({ _id: userId }, body);
          if (result.modifiedCount > 0) {
              return res.status(200).send({ msg: "User updated successfully" });
          } else {
              throw new Error("Failed to update user: User not found or no changes were made");
          }
      } else {
          res.status(401).send({ error: "User not found...!" });
      }
  } catch (error) {
      console.error("Error updating user:", error);
      res.status(401).send({ error: error.message });
  }
}

export const generateOTP = async (req,res)=>{
     req.app.locals.OTP = await OTPgenerator.generate(6,{lowerCaseAlphabets:false,upperCaseAlphabets:false,specialChars:false})
     res.status(201).send({code:req.app.locals.OTP})
}

export const verifyOTP = async (req,res)=>{
    const{code} = req.query
    if(parseInt(req.app.locals.OTP) === parseInt(code))
    {
        req.app.locals.OTP = null
        req.app.locals.createResetSession = true
        return res.status(201).send({msg:'Verify successfully...'})
    }
       return res.status(400).send({error:'Invalid Otp...'})
}

export const createResetSession = async (req,res)=>{
    if(req.app.locals.createResetSession)
    {
        // req.app.locals.resetSession = false
        return res.status(201).send({flag:req.app.locals.createResetSession})
    }

    return res.status(404).send({error:"Session expired!"})
}

export const resetPassword = async (req,res)=>{
    try 
    {
        if(!req.app.locals.createResetSession) return res.status(404).send({error:"Session expired!"})

        const{username,password} = req.body
        try 
        {
            const user = await UserModal.findOne({username})
            const pword = await bcrypt.hash(password,10)
            let result = await UserModal.updateOne({username:user.username},{password:pword})
            if(!result)
            {
                 throw err
            } 
            req.app.locals.createResetSession = false
            return res.status(201).send({msg:"Record Updated..!"})
        } 
        catch (error) {
            return res.status(500).send({error})
        }
        
    } catch (error) {
         return res.status(401).send({error})
    } 
}   

// export const getUserFromToken = async ()=>{
//     if(!token) return Promise.reject("Cannot find the token")
//     let decode = jwtDecode(token)
//     //return decode
//      console.log(decode);
// }