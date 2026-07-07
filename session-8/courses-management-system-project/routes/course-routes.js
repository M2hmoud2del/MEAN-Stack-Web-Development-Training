const express = require("express");
const courseControllers = require("../controllers/course-controllers");
const multerUpload = require("../middleware/multer-middleware");

const router = express.Router();


router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(multerUpload.single("imageUrl"), courseControllers.createCourse);

router
  .route("/:id")
  .get(courseControllers.getCourseById)
  .patch(multerUpload.single("imageUrl"),courseControllers.updateCourse)
  .delete(courseControllers.deleteCourse);

module.exports = router;
