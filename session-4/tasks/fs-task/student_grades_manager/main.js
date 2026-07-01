const addGrade = require('./modules/add-grade');
const readGrades = require('./modules/read-grades');
const updateGrade = require('./modules/update-grades');
const deleteGrade = require('./modules/delete-grade');

async function main() {
  const [, , command, ...args] = process.argv;

  switch (command) {
    case 'list':
    case 'read': {
      const grades = await readGrades();
      console.log(JSON.stringify(grades, null, 2));
      break;
    }

    case 'add': {
      const [name, subject, grade] = args;
      if (!name || !subject || !grade) {
        console.log('Usage: node main.js add <name> <subject> <grade>');
        process.exit(1);
      }

      await addGrade(name, subject, Number(grade));
      break;
    }

    case 'update': {
      const [target, subject, grade] = args;
      if (!target || !subject || !grade) {
        console.log('Usage: node main.js update <id-or-name> <subject> <grade>');
        process.exit(1);
      }

      const id = /^\d+$/.test(target) ? Number(target) : undefined;
      const name = /^\d+$/.test(target) ? undefined : target;
      await updateGrade(id, name, subject, Number(grade));
      break;
    }

    case 'delete': {
      const [target] = args;
      if (!target) {
        console.log('Usage: node main.js delete <id-or-name>');
        process.exit(1);
      }

      const id = /^\d+$/.test(target) ? Number(target) : undefined;
      const name = /^\d+$/.test(target) ? undefined : target;
      await deleteGrade(id, name);
      break;
    }

    default:
      console.log('Usage:\n  node main.js list\n  node main.js add <name> <subject> <grade>\n  node main.js update <id-or-name> <subject> <grade>\n  node main.js delete <id-or-name>');
  }
}

main().catch((error) => {
  console.error('Unexpected error:', error);
  process.exit(1);
});

