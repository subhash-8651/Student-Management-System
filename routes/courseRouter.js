const express = require("express");
const { getCourses, createCourse } = require("../controllers/courseControllers");
const { userauth } = require("../middlewares/auth");
const { authorize } = require("../middlewares/role");

const router = express.Router();


    router.get("/", userauth, getCourses);
    router.post("/", userauth, authorize("admin"), createCourse);

module.exports = router;
