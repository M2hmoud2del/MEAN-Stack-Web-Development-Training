let grades : Array<number> = [90, 80, 70, 60, 50];

function addGrade(grade: number): void {
  grades.push(grade);
}

function removeGrade(grade: number): void {
  const index = grades.indexOf(grade);
    if (index !== -1) {
        grades.splice(index, 1);
    }
}

function updateGrade(oldGrade: number, newGrade: number): void {
    const index = grades.indexOf(oldGrade);
    if (index !== -1) {
        grades[index] = newGrade;
    }
}

function getGrades(): number[] {
  return grades;
}

function getGradeCount(): number {
  return grades.length;
}

function getHighestGrade(): number | undefined {
  return grades.length > 0 ? Math.max(...grades) : undefined;
}

function getLowestGrade(): number | undefined {
  return grades.length > 0 ? Math.min(...grades) : undefined;
}

function calculateAverage(gradeArray: number[]): number {
  const sum = gradeArray.reduce((acc, grade) => acc + grade, 0);
  return sum / gradeArray.length;
}

function showResults(): void {
    console.log("Grades:", getGrades());
    console.log("Grade Count:", getGradeCount());
    console.log("Highest Grade:", getHighestGrade());
    console.log("Lowest Grade:", getLowestGrade());
    console.log("Average Grade:", calculateAverage(getGrades()));
}

addGrade(85);
addGrade(95);
addGrade(75);
addGrade(65);
showResults();