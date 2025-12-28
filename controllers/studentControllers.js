const bcrypt=require('bcrypt');
const {validateSignupData}=require('../utils/validation')
const User=require('../models/student.js')

const getStudent=async(req,res)=>{
    try{
    const allstudents =await User.find({});
    res.send(allstudents);
  }
  catch(err){
    res.status(400).send('Error in connecting to database')
  }
}

const createStudent=async(req,res)=>{
    try {
    validateSignupData(req);
    const {firstName,lastName,emailId,password,role,age,city}=req.body;
    const passwordHash= await bcrypt.hash(password,10);
    const user = new User({
      firstName,
      lastName,
      emailId,
      password : passwordHash,
      role,
      age,
      city
    });

    await user.save();
    res.send("User created successfully");
  } catch (err) {
    res.status(500).send("Error"+err);
  }
}

const updateStudent=async(req,res)=>{
    const userId = req.params.id;
    const data = req.body;
    try {
        const ALLOWED_UPDATES = [
          "age",
          "city"
        ];

      const isUpdateAllowed = Object.keys(data).every((k) => ALLOWED_UPDATES.includes(k));

      if (!isUpdateAllowed) {
          throw new Error("Update Not Allowed")
      }
        const user = await User.findByIdAndUpdate({ _id: userId }, data, { returnDocument: "before" });
        res.send("User updated successfully")
        

    } catch (err) {
        res.status(400).send(err)
    }

}

const deleteStudent=async(req,res)=>{
    const userId = req.params.id;

    try {
        const students = await User.findByIdAndDelete(userId);
        res.send("User deleted Successfully")

    } catch (err) {
        res.status(400).send("Something went wrong")
    }
}

module.exports={
    getStudent,
    createStudent,
    updateStudent,
    deleteStudent
}