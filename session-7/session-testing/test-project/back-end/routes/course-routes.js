const { getAllCourses, getCourseById, createCourse, updateCourse, replaceCourse, deleteCourse } = require('../controller/course-controllers');
const { uploadMiddleware } = require('../middlewares/multer-middleware');

const express = require('express');

const router = express.Router();


router
.route('/')
.get(getAllCourses)
.post(uploadMiddleware, createCourse);

router
.route('/:id')
.get(getCourseById)
.patch(updateCourse)
.put(replaceCourse);

router
.route('/:id')
.delete(deleteCourse);

module.exports = router;