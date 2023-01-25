import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';

import { Student } from '../students/student.entity';

@Entity('departments')
export class Department {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => Student,
    (student) => student.department,
    { cascade: true }
  )
  students: Student[];

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;
}