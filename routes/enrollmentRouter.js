const express = require("express");
const {
  enrollCourse,
  myCourses
} = require("../controllers/enrollmentController");

const { userauth } = require("../middlewares/auth");
const { authorize } = require("../middlewares/role");


const router = express.Router();

router.post("/enroll/:courseId", userauth, authorize("student"), enrollCourse);
router.get("/my-courses", userauth, authorize("student"), myCourses);

module.exports = router;
