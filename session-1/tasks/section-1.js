const patients = [
    {
        name: "Mahmoud",
        severity: 5,
        hasData: true,
        condition: "critical"
    },
    {
        name: "Ahmed",
        severity: 2,
        hasData: true,
        condition: "normal"
    },
    {
        name: "Ali",
        severity: 4,
        hasData: false,
        condition: "normal"
    },
    {
        name: "Sara",
        severity: 3,
        hasData: true,
        condition: "normal"
    },
    {
        name: "Mona",
        severity: 5,
        hasData: true,
        condition: "normal"
    }
];

let treatedImmediately = [];
let normalTreated = [];
let missingDataList = [];

// Validate Patients
for (let i = 0; i < patients.length; i++) {

    if (patients[i].hasData == false) {
        missingDataList.push(patients[i]);
        continue;
    }

    if (patients[i].condition == "critical") {
        treatedImmediately.push(patients[i]);
    } else {
        normalTreated.push(patients[i]);
    }
}

// Sort normal patients by severity (Descending)
for (let i = 0; i < normalTreated.length - 1; i++) {

    for (let j = i + 1; j < normalTreated.length; j++) {

        if (normalTreated[i].severity < normalTreated[j].severity) {

            let temp = normalTreated[i];
            normalTreated[i] = normalTreated[j];
            normalTreated[j] = temp;

        }

    }

}

console.log("Treated Immediately:");
console.log(treatedImmediately);

console.log("Normal Treated:");
console.log(normalTreated);

console.log("Missing Data:");
console.log(missingDataList);
