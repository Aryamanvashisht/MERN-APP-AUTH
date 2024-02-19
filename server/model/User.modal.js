import  Mongoose  from "mongoose";

export const UserSchema = new Mongoose.Schema({
    username:{
        type:String,
        required:[true,"Please provide unique username"],
        unique:[true,"Username exists"]
    },
     password:{
        type:String,
        required:[true,"Please provide unique password"],
        unique:false
     },
     email:{
        type:String,
        required:[true,"Please provide unique email"],
        unique:true
     },
     
     firstName:{type:String},
     lastName:{type:String},
     mobile:{type:Number},
     address:{type:String},
     profile:{type:String}
})


export default Mongoose.model.Users || Mongoose.model('User',UserSchema);