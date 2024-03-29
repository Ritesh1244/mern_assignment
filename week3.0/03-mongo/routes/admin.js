const { Router } = require("express");
const { Admin, Course } = require("../db");
const adminMiddleware = require("../middleware/admin");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;
  // check if a admin with this username already exist
  await Admin.create({
    username: username,
    password: password,
  });

  res.json({
    message: "Admin created Succesfully",
  });
});

router.post("/courses", adminMiddleware, async (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;

  const newcourse = await Course.create({
    title: title,
    description: description,
    imageLink: imageLink,
    price: price,
  });

  res.json({
    message: "Course created successfully",
    courseId: newcourse._id,
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic

  const allCourses = await Course.find({});

  res.json({
    courses: allCourses,
  });
});

module.exports = router;
