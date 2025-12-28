const mongoose=require('mongoose')

const enrollmentSchema=new mongoose.Schema({
    StudentId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    CourseID:{
        type: mongoose.Schema.Types.ObjectId,
    },
   

})
module.exports=mongoose.model("Enrollment",enrollmentSchema);