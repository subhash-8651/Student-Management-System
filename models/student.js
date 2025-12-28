const mongoose=require('mongoose');
const validator = require('validator');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt')
require('dotenv').config();

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required: true,
        minLength: 3,
        maxLenght: 50
    },
    lastName:{
        type:String,
        minLength:3,
        maxLenght:20
    },
    emailId:{
        type:String,
        lowercase: true,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email :" + value)
            }
        }
    },
    password:{
        type:String,
        validate(value) {
            if (!validator.isStrongPassword(value)) {
                throw new Error("Enter a strong password :" + value)
            }
        }
    },
    role:{
        type:String,
        enum:{
            values:["admin","student"],
            message:`{VALUE} is incorrect user type`
        },
    
    },
    
    age:{
        type: Number,
        min: 18,
        max:75
    
    },
    city: {
        type: String,
    },

});
// schema methods
userSchema.methods.getJWT=async function(){
        const user=this;
        const token=await jwt.sign(
        {_id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )
          return token;
}

userSchema.methods.validatePassword=async function(passwordByUser){
    const user=this;
    const passwordHash=user.password;
    const isPassword=bcrypt.compare(passwordByUser,passwordHash);
    return isPassword;
}



// const User=mongoose.model("User","userSchema");
module.exports=mongoose.model("User",userSchema);