const express = require("express");
const {
  getStudent,
  createStudent,
  updateStudent,
  deleteStudent
} = require("../controllers/studentControllers");

const { userauth } = require("../middlewares/auth");
const { authorize } = require("../middlewares/role");


const router = express.Router();

router.use(userauth, authorize("admin"));

router.get("/", getStudent);
router.post("/", createStudent);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
