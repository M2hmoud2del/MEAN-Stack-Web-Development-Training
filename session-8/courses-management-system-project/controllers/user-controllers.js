const User = require('../models/user-model');
const Course = require('../models/course-model');

const enrollUserInCourse = async (req, res) => {
    try {
    const userId = req.user.id;
    const courseId = req.params.courseId;
    
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }else if (user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ status: 'fail', message: 'User is already enrolled in this course' });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ status: 'fail', message: 'Course not found' });
    }
    course.students++;
    await course.save()
    user.enrolledCourses.push(courseId);
    await user.save();
    res.status(200).json({ status: 'success', message: 'User enrolled in course successfully' });
    }catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

const unenrollUserFromCourse = async (req, res) => {
  try {
    const userId = req.user.id;
    const courseId = req.params.courseId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }else if (!user.enrolledCourses.includes(courseId)) {
      return res.status(400).json({ status: 'fail', message: 'User is not enrolled in this course' });
    }
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ status: 'fail', message: 'Course not found' });
    }
    if(course.students > 0)
    {
      course.students--;
    }
    await course.save()
    user.enrolledCourses = user.enrolledCourses.filter(id => String(id) !== String(courseId));
    await user.save();
    res.status(200).json({ status: 'success', message: 'User unenrolled from course successfully' });
  }catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

const getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate('enrolledCourses');
    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }
    res.status(200).json({ status: 'success', data: user.enrolledCourses });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}

module.exports = {
  enrollUserInCourse,
  unenrollUserFromCourse,
  getEnrolledCourses
};