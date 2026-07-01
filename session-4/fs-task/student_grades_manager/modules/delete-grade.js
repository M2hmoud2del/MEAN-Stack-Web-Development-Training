const readGrades = require('./read-grades');
const saveGrades = require('./save-grades');

async function deleteGrade(id, name) {
    if(!id && !name){
        console.log('Please provide either an ID or a name to delete a grade.');
        return null;
    }
    try {
        const grades = await readGrades();
        const index = grades.findIndex(item => item.id === id || item.name === name || item.student === name);
        if (index !== -1) {
            const deletedGrade = grades.splice(index, 1)[0];
            await saveGrades(grades);
            console.log(`Grade with ID ${id} and Name ${name} has been deleted successfully.`);
            return deletedGrade;
        }
        else {
            console.log(`Grade with ID ${id} and Name ${name} not found.`);
            return null;
        }
    } catch (error) {
        console.log('Error Deleting grade:', error);
    }

}

module.exports = deleteGrade;