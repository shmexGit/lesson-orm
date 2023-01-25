import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
} from 'typeorm';

import { Student } from '../students/student.entity';

@Entity('courses')
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => Student,
    (student) => student.courses,
    { cascade: true }
  )
  students: Student[];

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;
}