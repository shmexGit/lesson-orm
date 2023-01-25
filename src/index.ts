import { Command } from '@commander-js/extra-typings';
import courseService from './courses/course.service';
import studentService from './students/student.service';
import departmentService from './departments/department.service';
import reportCardService from './report-cards/report-card.service';
import { ActionNames, EntityNames, ICommandOptions } from './types';

const services = {
  [EntityNames.STUDENTS]: studentService,
  [EntityNames.COURSES]: courseService,
  [EntityNames.DEPARTMENTS]: departmentService,
  [EntityNames.REPORT_CARD]: reportCardService,
}

const program = new Command();
program
  .version("1.0.0")
  .description("An example of working with typeorm")
  .option("-e, --entity <value>", "Name entity")
  .option("-a, --action <value>", "Name action")
  .option("-c, --conditions <value>", "Conditions for search (json format)")
  .option("-i, --id <value>", "Id row for action update or delete")
  .option("-d, --data <value>", "Data entity (json format) for action update (only object) or create")
  .parse(process.argv);

const options = program.opts() as ICommandOptions;

const app = async () => {
  if (!options.entity || !options.action) {
    console.log('Entity and action option are required!');
    return;
  }

  if (
      (
        options.action === ActionNames.UPDATE ||
        options.action === ActionNames.DELETE
      ) && !options.id
    ) {
    console.log('The id parameter is required if the action is being update or delete!');
    return;
  }

  if (
      (
        options.action === ActionNames.UPDATE ||
        options.action === ActionNames.DELETE
      ) && !options.data
  ) {
    console.log('The data parameter is required if the action is being update or create!');
    return;
  }
}

app();