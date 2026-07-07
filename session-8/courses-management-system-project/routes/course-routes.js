const express = require("express");
const courseControllers = require("../controllers/course-controllers");
const multerUpload = require("../middleware/multer-middleware");
const authenticateMiddleware = require("../middleware/authentication-middleware");
const authorizationMiddleware = require("../middleware/authorization-middleware");
const router = express.Router();


router
  .route("/")
  .get(courseControllers.getAllCourses)
  .post(authenticateMiddleware, authorizationMiddleware("user"), multerUpload.single("imageUrl"), courseControllers.createCourse);

router
  .route("/:id")
  .get(courseControllers.getCourseById)
  .patch(authenticateMiddleware, authorizationMiddleware("admin"), multerUpload.single("imageUrl"), courseControllers.updateCourse)
  .delete(authenticateMiddleware, authorizationMiddleware("admin"), courseControllers.deleteCourse);

module.exports = router;
