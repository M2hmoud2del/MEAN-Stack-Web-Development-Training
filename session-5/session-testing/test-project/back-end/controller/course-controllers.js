const fs = require('fs');
const path = require('path');


let courses = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/courses.json'), 'utf8'));


const getAllCourses = (req, res) => {
    res.status(200).send({status: 'success', count: courses.length, data: courses});
}

const getCourseById = (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send({status: 'error', message: 'The course with the given ID was not found.'});
    res.status(200).send({status: 'success', data: course});
}

const createCourse = (req, res) => {
    const id = courses[courses.length - 1].id + 1;
    
    const course = {id, ...req.body};

    courses.push(course);
    fs.writeFile('../data/courses.json',
        JSON.stringify(courses,null,2), (err) => {
            if(err){
                return res.status(500).json({message:"Wrong JSON"})
            }
            res.status(201).send({status: 'success',message:'Course added successfully', data: course})
        }
    )
}

const updateCourse = (req, res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send({status: 'error', message: 'The course with the given ID was not found.'});
    Object.assign(course, req.body);
    fs.writeFile('../data/courses.json',
        JSON.stringify(courses,null,2), (err) => {
            if(err){
                return res.status(500).json({message:"Wrong JSON"})
            }
            res.status(200).send({status: 'success', message: 'Course updated successfully', data: course})
        }
    )
}

const replaceCourse = (req, res) => {
    const {
    title,
    instructor,
    category,
    price,
    duration,
    level,
    rating,
    students,
    image
} = req.body;

if (
    !title ||
    !instructor ||
    !category ||
    price === undefined ||
    !duration ||
    !level ||
    rating === undefined ||
    students === undefined ||
    !image
) {
    return res.status(400).send({
        status: 'error',
        message: 'All fields are required for PUT.'
    });
    }
    const index = courses.findIndex(c => c.id === parseInt(req.params.id));

    if (index === -1) {
        return res.status(404).send({
            status: 'error',
            message: 'The course with the given ID was not found.'
        });
    }

    const updatedCourse = {
        id: courses[index].id,
        title: req.body.title,
        instructor: req.body.instructor,
        category: req.body.category,
        price: req.body.price,
        duration: req.body.duration,
        level: req.body.level,
        rating: req.body.rating,
        students: req.body.students,
        image: req.body.image
    };

    courses[index] = updatedCourse;

    fs.writeFile(
        '../data/courses.json',
        JSON.stringify(courses, null, 2),
        err => {
            if (err) {
                return res.status(500).send({
                    status: 'error',
                    message: 'Wrong JSON'
                });
            }

            res.status(200).send({
                status: 'success',
                message: 'Course updated successfully',
                data: updatedCourse
            });
        }
    );
}

const deleteCourse = (req, res) =>{
    courseIndex =  courses.findIndex( c => c.id === parseInt(req.params.id))
    if(courseIndex <= -1) return res.status(404).send({status:'error',message: 'The course with the given ID was not found.'})
    course = courses[courseIndex];
    courses.splice(courseIndex,1);
    fs.writeFile('../data/courses.json', JSON.stringify(courses, null, 2), err => {
        if(err)return res.status(500).send({status:'error',message:'Wrong JSON'})
        res.status(200).send({status:'success',message:'Course Deleted successfully'})
    })
}

module.exports = {
    getAllCourses,
    getCourseById,
    createCourse,
    updateCourse,
    replaceCourse,
    deleteCourse
}