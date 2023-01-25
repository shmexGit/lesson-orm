import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  ManyToOne,
  JoinTable,
  OneToOne,
} from 'typeorm';

import { Course } from '../courses/course.entity';
import { ReportCard } from '../report-cards/report-card.entity';
import { Department } from '../departments/department.entity';

@Entity('students')
export class Student {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[];

  @ManyToOne(() => Department)
  department: Department;

  @OneToOne(() => ReportCard, { cascade: true })
  reportCard: ReportCard;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;
}