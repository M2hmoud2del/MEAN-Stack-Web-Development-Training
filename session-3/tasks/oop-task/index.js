class Person {
    #email;
    #id;

    constructor(name, email, id) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        if (!value.includes("@")) {
            throw new Error("Invalid Email");
        }
        this.#email = value;
    }

    get id() {
        return this.#id;
    }

    set id(value) {
        if (!value) {
            throw new Error("Invalid ID");
        }
        this.#id = value;
    }

    describeRole() {
        console.log(`${this.name} is a person.`);
    }

    toString() {
        return `
Name : ${this.name}
Email: ${this.email}
ID   : ${this.id}
Role : ${this.constructor.name}
`;
    }
}

class Principal extends Person {
    constructor(name, email, id) {
        super(name, email, id);
        this.members = [];
    }

    addMember(member) {
        if (!(member instanceof Person)) {
            console.log("Only Person objects can be added.");
            return;
        }

        const exists = this.members.find(m => m.id === member.id);

        if (exists) {
            console.log("Member already exists.");
            return;
        }

        this.members.push(member);
        console.log(`${member.name} added successfully.`);
    }

    removeMember(id) {
        const index = this.members.findIndex(member => member.id === id);

        if (index === -1) {
            console.log("Member not found.");
            return;
        }

        console.log(`${this.members[index].name} removed.`);
        this.members.splice(index, 1);
    }

    listMembers() {
        console.log("\n===== School Members =====");

        if (this.members.length === 0) {
            console.log("No members.");
            return;
        }

        this.members.forEach(member => {
            console.log(member.toString());
        });
    }

    describeRole() {
        console.log(`${this.name} manages the school.`);
    }
}

class Teacher extends Person {
    constructor(name, email, id, subject) {
        super(name, email, id);

        this.subject = subject;
        this.grades = [];
    }

    gradeStudent(studentName, grade) {
        if (grade < 0 || grade > 100) {
            console.log("Invalid grade.");
            return;
        }

        this.grades.push({
            studentName,
            grade
        });

        console.log(`${studentName} graded successfully.`);
    }

    listGrades() {
        console.log(`\nGrades by ${this.name}`);

        if (this.grades.length === 0) {
            console.log("No grades.");
            return;
        }

        this.grades.forEach(student => {
            console.log(`${student.studentName}: ${student.grade}`);
        });
    }

    describeRole() {
        console.log(`${this.name} teaches ${this.subject}.`);
    }
}

class Student extends Person {
    constructor(name, email, id) {
        super(name, email, id);

        this.subjects = [];
    }

    enroll(subject) {
        if (this.subjects.includes(subject)) {
            console.log(`${this.name} is already enrolled in ${subject}.`);
            return;
        }

        this.subjects.push(subject);
        console.log(`${this.name} enrolled in ${subject}.`);
    }

    listSubjects() {
        console.log(`\nSubjects of ${this.name}`);

        if (this.subjects.length === 0) {
            console.log("No subjects.");
            return;
        }

        this.subjects.forEach(subject => console.log(subject));
    }

    describeRole() {
        console.log(`${this.name} is studying.`);
    }
}

// ======================
// Simulation
// ======================

const principal = new Principal(
    "Mr. Ahmed",
    "principal@school.com",
    1
);

const teacher1 = new Teacher(
    "Ali",
    "ali@school.com",
    2,
    "Mathematics"
);

const teacher2 = new Teacher(
    "Sara",
    "sara@school.com",
    3,
    "Physics"
);

const student1 = new Student(
    "Omar",
    "omar@gmail.com",
    4
);

const student2 = new Student(
    "Mona",
    "mona@gmail.com",
    5
);

// Principal adds members
principal.addMember(teacher1);
principal.addMember(teacher2);
principal.addMember(student1);
principal.addMember(student2);

// Students enroll
student1.enroll("Mathematics");
student1.enroll("Physics");

student2.enroll("Physics");
student2.enroll("Chemistry");

// Teachers grade students
teacher1.gradeStudent("Omar", 95);
teacher1.gradeStudent("Mona", 88);

teacher2.gradeStudent("Omar", 91);
teacher2.gradeStudent("Mona", 97);

// List all members
principal.listMembers();

// List grades
teacher1.listGrades();
teacher2.listGrades();

// List subjects
student1.listSubjects();
student2.listSubjects();

// Polymorphism
console.log("\n===== Describe Roles =====");

for (const member of principal.members) {
    member.describeRole();
}

principal.describeRole();

// Remove a member
principal.removeMember(3);

// List again
console.log("\n===== Members After Removal =====");
principal.listMembers();
