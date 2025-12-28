const bcrypt=require('bcrypt');
const {validateSignupData}=require('../utils/validation')
const User=require('../models/student.js')


const signUpUser=async (req, res) => {

    try {
    validateSignupData(req);
    const {firstName,lastName,emailId,password,role}=req.body;
    console.log(role)
    console.log(firstName)
    const passwordHash= await bcrypt.hash(password,10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password : passwordHash,
      role
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error"+err);
  }
}

const loginUser=async (req,res)=>{     
  try{
    const {emailId,password}=req.body;
    const user =await User.findOne({emailId:emailId});
    if(!user){
      throw new err('Invalid Credentials');
    }
    const isPassword=await user.validatePassword(password);
    if(isPassword){
      const token=await user.getJWT();
      res.cookie('token',token,{
        expires: new Date(Date.now()+8*3600000)
      })
      res.send('User logged in sucessfully');

    }else{
      throw new err('Invalid Credentials')
    }

  }catch(err){
        res.status(500).send("Error"+err);
  }
}
module.exports={
    signUpUser,
    loginUser
}

