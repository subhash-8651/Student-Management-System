const Course = require("../models/course.js");

const getCourses = async (req, res) => {
  const courses = await Course.find({});
  res.json(courses);
};

const createCourse = async (req, res) => {
  const course = await Course.create(req.body);
  res.status(201).json(course);
};

module.exports={
    getCourses,
    createCourse
}