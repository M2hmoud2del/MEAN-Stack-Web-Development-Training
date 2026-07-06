const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 100,
    trim: true,
    default: "Untitled Course",
    message: "Title must be between 5 and 100 characters",
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 500,
    trim: true,
    message: "Description must be between 10 and 500 characters",
    required: true,
  },
    instructor: {
    type: String,
    minlength: 3,
    maxlength: 50,
    trim: true,
    message: "Instructor name must be between 3 and 50 characters",
    required: true,
  },
    duration: {
    type: String,
    minlength: 1,
    maxlength: 20,
    trim: true,
    message: "Duration must be between 1 and 20 characters",
    required: true,
  },
    price: {
    type: Number,
    min: 0,
    message: "Price must be a positive number",
    required: true,
  },
    createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    trim: true,
    enum: ["Web Development", "Data Science", "Mobile Development", "Game Development", "Other"],
    message: "Category must be one of the following: Web Development, Data Science, Mobile Development, Game Development, Other",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    message: "Rating must be a number between 0 and 5",
  },
  studentsEnrolled: {
    type: Number,
    min: 0,
    trim: true,
    message: "Number of students enrolled must be a positive number",
    default: 0,
  },
  imageUrl: {
    type: String,
    minlength: 5,
    maxlength: 200,
    trim: true,
    message: "Image URL must be between 5 and 200 characters",
    required: true,
  },
  level: {
    type: String,
    minlength: 3,
    maxlength: 20,
    message: "Level must be between 3 and 20 characters",
    trim: true,
    required: true,
    enum: ["Beginner", "Intermediate", "Advanced"],
    message: "Level must be one of the following: Beginner, Intermediate, Advanced",
  },
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;