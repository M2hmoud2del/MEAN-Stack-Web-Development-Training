const fs = require('fs').promises;
const path = require('path');


async function saveGrades(grades) {
    try{
        const filePath = path.resolve(__dirname, '../data/grades.json');
        await fs.writeFile(filePath, JSON.stringify(grades));

    }catch(error){
        console.log('Error Saving grades file:', error);
    }
}

module.exports = saveGrades;