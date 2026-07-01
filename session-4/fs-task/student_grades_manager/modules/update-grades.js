const readGrades = require('./read-grades');
const saveGrades = require('./save-grades');

async function updateGrade(id, name, subject, grade) {
    if(!id && !name){
        console.log('Please provide either an ID or a name to update a grade.');
        return null;
    }
    try {
        const grades = await readGrades();
        const index = grades.findIndex(item => item.id === id || item.name === name || item.student === name);
        if (index !== -1) {
            grades[index].subject = subject;
            grades[index].grade = grade;
            await saveGrades(grades);
            console.log(`Grade with ID ${id} and Name ${name} has been updated successfully.`);
            return grades[index];
        }
        else {
            console.log(`Grade with ID ${id} and Name ${name} not found.`);
            return null;
        }
    } catch (error) {
        console.log('Error Updating grade:', error);
    }

}

module.exports = updateGrade;