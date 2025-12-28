const mongoose=require('mongoose')

const courseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength: 2,
        maxLenght: 50

    },
    description:{
        type:String,
        minLength:3,
        maxLenght:60
    },
        
})

module.exports=mongoose.model("Course",courseSchema);