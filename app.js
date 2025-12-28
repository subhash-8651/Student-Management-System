const express = require("express");
const connectDB = require("./config/database.js");
const cookieParser = require("cookie-parser");
require('dotenv').config();


const app = express();


app.use(express.json());
app.use(cookieParser());


app.use("/api/auth", require("./routes/authRouter"));
app.use("/api/students", require("./routes/studentRouter"));
app.use("/api/courses", require("./routes/courseRouter"));
app.use("/api/enrollments", require("./routes/enrollmentRouter"));
app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(process.env.PORT, () => {
      console.log("App is running on the server");
    });
  })
  .catch((err) => {
    console.log("Error in connecting to database " + err);
  });
