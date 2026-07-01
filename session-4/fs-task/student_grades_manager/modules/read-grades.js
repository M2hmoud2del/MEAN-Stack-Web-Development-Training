const fs = require('fs').promises;
const path = require('path');

async function readGrades() {
  try {
    const filePath = path.resolve(__dirname, '../data/grades.json');
    const data = await fs.readFile(filePath, 'utf-8');
    const students = JSON.parse(data);
    return students;
  } catch (error) {
    console.log('Error reading grades file:', error);
  }

}

module.exports = readGrades;