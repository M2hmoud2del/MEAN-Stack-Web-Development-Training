const Course = require('../models/Course');
const fs = require('fs');
const path = require('path');


let courses = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/courses.json'), 'utf8'));


const getAllCourses = async (req, res) => {
    try{
        excludeFields = ['sort', 'page', 'limit'];
        // console.log(req.query);
        const excludededQuery = { ...req.query };
        excludeFields.forEach(field => delete excludededQuery[field]);
        const updatedQuery = queryRange(excludededQuery);
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        // console.log(updatedQuery);
        const courses = await Course.find(updatedQuery).sort(req.query.sort).skip(skip).limit(limit);
        res.status(200).send({status: 'success', count: courses.length, data: courses});
    }catch(error){
        res.status(400).json({
            status: "error",
            message: `faield to fetch courses ${error.message}`
        })
    }
}

const getCourseById = async (req, res) => {
    try{
        if(req.params.id.length !== 24) return res.status(400).send({status: 'error', message: 'Invalid course ID format.'});
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).send({status: 'error', message: 'The course with the given ID was not found.'});
        res.status(200).send({status: 'success', data: course});

    }catch(error){
        res.status(400).json({
            status: "error",
            message: `faield to fetch course ${error.message}`
        })
    }
}

const createCourse = async (req, res) => {
    try{
        const course = new Course(req.body);
        await course.save();
        res.status(201).send({status: 'success', data: course});
    }catch(error){
        res.status(400).json({
            status: "error",
            message: `Failed to create course ${error.message}`
        })
    }
}

const updateCourse = async (req, res) => {
    try{
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, returnDocument: 'after' });
        if (!course) return res.status(404).send({status: 'error', message: 'The course with the given ID was not found.'});
        res.status(200).send({status: 'success', data: course});
    }catch(error){
        res.status(400).json({
            status: "error",
            message: `Failed to update course ${error.message}`
        })
    }
}

const replaceCourse = async (req, res) => {
    try {
        const course = await Course.findOneAndReplace(
            { _id: req.params.id },
            req.body,
            {
                runValidators: true,
                returnDocument: 'after'
            }
        );

        if (!course) {
            return res.status(404).json({
                status: "error",
                message: "The course with the given ID was not found."
            });
        }

        res.status(200).json({
            status: "success",
            data: course
        });

    } catch (error) {
        res.status(400).json({
            status: "error",
            message: error.message
        });
    }
};

const deleteCourse = async (req, res) => {
    try{
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) return res.status(404).send({status: 'error', message: 'The course with the given ID was not found.'});
        res.status(200).send({status: 'success', message: 'Course deleted successfully'});
    }catch(error){
        res.status(400).json({
            status: "error",
            message: `Failed to delete course ${error.message}`
        })
    }
}

function queryRange(query){
    const filteredQuery = {};
    for(let key in query){
        const value = query[key];
        const match = key.match(/^(.+)\[(gte|gt|lte|lt)\]$/);
        // console.log(match);
        
        if(match){
            const field = match[1];
            const operator = `$${match[2]}`;
            
            if (!filteredQuery[field]) {
                filteredQuery[field] = {};
            }
            filteredQuery[field][operator] = Number(value);
        }else{
            filteredQuery[key] = { $regex: value , $options: 'i' };
        }
    }
    // console.log(filteredQuery);
    
    return filteredQuery;
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    replaceCourse,
    deleteCourse
}