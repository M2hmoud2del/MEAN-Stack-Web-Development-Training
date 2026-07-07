const express = require("express");
const userControllers = require("../controllers/user-controllers");
const authenticateMiddleware = require("../middleware/authentication-middleware");
const router = express.Router();

router
  .route("/enroll/:courseId")
  .post(authenticateMiddleware, userControllers.enrollUserInCourse);

router
  .route("/unenroll/:courseId")
  .post(authenticateMiddleware, userControllers.unenrollUserFromCourse);

router
  .route("/enrolled-courses")
  .get(authenticateMiddleware, userControllers.getEnrolledCourses);

module.exports = router;