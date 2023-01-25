import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';

import { Student } from '../students/student.entity';

@Entity('report-cards')
export class ReportCard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToOne(() => Student)
  student: Student;

  @Column()
  createdAt: string;

  @Column({ nullable: true })
  updatedAt: string;
}