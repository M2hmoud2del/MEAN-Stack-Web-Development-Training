const fs = require("fs").promises;
const path = require("path");
const Course = require("../models/course-model");
const deleteUploadedFile = require("../utils/delete-uploaded-file");

// Get all courses
const getAllCourses = async (req, res) => {
  try {
    // Copy query parameters
    const queryObj = { ...req.query };

    // Remove reserved fields
    const excludedFields = ["sort", "page", "limit"];
    excludedFields.forEach((field) => delete queryObj[field]);

    // Convert operators like rating[gte]=4.5 & Make case insensitive
    const mongoQuery = queriesIntoMongoDBOperators(queryObj);

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Build query  // Sorting // Pagination
    const courses = await Course.find(mongoQuery)
      .sort(req.query.sort)
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      status: "success",
      count: courses.length,
      data: {
        courses,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: `Failed to fetch courses: ${error.message}`,
    });
  }
};

// Create course
const createCourse = async (req, res) => {
  try {
    const category = req.body.category?.toLowerCase();
    const level = req.body.level?.toLowerCase();

    const newCourse = await Course.create({
      ...req.body,
      category,
      level,
      imageUrl: req.file?.filename,
    });

    res.status(201).json({
      status: "success",
      message: "Course added successfully",
      data: {
        course: newCourse,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("courses", req.file.filename);
    }
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        course,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Update course
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    if (req.body.category) req.body.category = req.body.category.toLowerCase();
    if (req.body.level) req.body.level = req.body.level.toLowerCase();

    if (req.file) {
      req.body.imageUrl = req.file.filename;
      if (course.imageUrl) deleteUploadedFile("courses", course.imageUrl);
    }

    Object.assign(course, req.body);

    const updatedCourse = await course.save();

    res.status(200).json({
      status: "success",
      message: "Course updated successfully",
      data: {
        course: updatedCourse,
      },
    });
  } catch (error) {
    if (req.file) {
      deleteUploadedFile("courses", req.file.filename);
    }
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

// Delete course
const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);

    if (!deletedCourse) {
      return res.status(404).json({
        status: "fail",
        message: "Course not found",
      });
    }

    if (deletedCourse.imageUrl) {
      deleteUploadedFile("courses", deletedCourse.imageUrl);
    }

    res.status(200).json({
      status: "success",
      message: "Course deleted successfully",
      data: {
        course: deletedCourse,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getAllCourses,
  createCourse,
  getCourseById,
  updateCourse,
  deleteCourse,
};

function queriesIntoMongoDBOperators(query) {
  const mongoQuery = {};
  for (const key in query) {
    const value = query[key];
    const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
    if (match) {
      const field = match[1];
      const operator = `$${match[2]}`;
      if (!mongoQuery[field]) {
        mongoQuery[field] = {};
      }
      mongoQuery[field][operator] = Number(value);
    } else {
      mongoQuery[key] = { $regex: value, $options: "i" };
    }
  }
  return mongoQuery;
}
