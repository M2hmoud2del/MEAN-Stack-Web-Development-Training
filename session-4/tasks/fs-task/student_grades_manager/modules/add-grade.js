const readGrades = require('./read-grades');
const saveGrades = require('./save-grades');

async function addGrade(name, subject, grade) {
    try {
        const grades = await readGrades();
        const newGradeId = grades.length > 0 ? grades[grades.length - 1].id + 1 : 1;
        const newGrade = { id: newGradeId, name, subject, grade };
        grades.push(newGrade);
        await saveGrades(grades);
        console.log(`New Grade: ${newGrade.name} - ${newGrade.subject}: ${newGrade.grade}. Added Successfully.`);
        return newGrade;
    } catch (error) {
        console.log('Error Saving grades file:', error);
    }
}

module.exports = addGrade;