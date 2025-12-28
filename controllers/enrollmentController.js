const Enrollment = require("../models/enrollment.js");

const enrollCourse = async (req, res) => {
  const enrollment = await Enrollment.create({
    StudentId: req.user._id,
    CourseID: req.params.courseId
  });
  res.status(201).json(enrollment);
};

const myCourses = async (req, res) => {
  const courses = await Enrollment.find({ StudentId: req.user._id })
    .populate("CourseID");
  res.json(courses);
};

module.exports={
    enrollCourse,
    myCourses
}
