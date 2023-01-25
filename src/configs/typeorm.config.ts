import { DataSourceOptions } from 'typeorm';

import { Course } from '../courses/course.entity';
import { Department } from '../departments/department.entity';
import { Student } from '../students/student.entity';
import { ReportCard } from '../report-cards/report-card.entity';

export const typeormConfig: DataSourceOptions = {
  type: 'sqlite',
  database: './db.sql',
  synchronize: true,
  logging: true,
  entities: [Department, Student, Course, ReportCard],
};