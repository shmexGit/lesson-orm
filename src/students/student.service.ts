import { FindOptionsWhere, IsNull, In } from 'typeorm';
import { Student } from './student.entity';
import { Course } from '../courses/course.entity';
import { ReportCard } from '../report-cards/report-card.entity';
import { connection } from '../utils/data-source';
import { ICreateStudentData, IUpdateStudentCourseData, ErrorMessages } from '../types';

const find = async (where?: FindOptionsWhere<Course>) => {
  const dataSource = await connection();
  try {
    return dataSource.getRepository(Course).find({
      where,
      relations: {
        students: true
      },
      order: { createdAt: 'ASC' }
    });
  } catch(error) {
    new Error(ErrorMessages.ERROR_FIND_CONDITIONS);
  } finally {
    dataSource.destroy();
  }
  
}

const create = async (data: ICreateStudentData) => {
  const dataSource = await connection();
  try {
    const repositoryStudent = dataSource.getRepository(Student);
    const repositoryCourse = dataSource.getRepository(Course);
    const repositoryReportCard = dataSource.getRepository(ReportCard);

    const { reportCardId, courseIds, ...other } = data;

    let reportCard: ReportCard;
    if (reportCardId) {
      reportCard = await repositoryReportCard.findOneBy({
        id: reportCardId,
        student: IsNull()
      });
      if (!reportCard) {
        new Error(ErrorMessages.ERROR_ALREADY_TIED_COURSE);
      }
    }

    let courses: Array<Course>;
    if (courseIds) {
      courses = await repositoryCourse.find({
        where: {
          id: In(courseIds)
        }
      });
    }
  
    const newStudent = repositoryStudent.create({
      ...other,
      reportCard,
      courses,
      createdAt: new Date().toDateString(),
    });
    return repositoryStudent.save(newStudent);
  } catch(error) {
    new Error(ErrorMessages.ERROR_CREATE);
  } finally {
    dataSource.destroy();
  }
}

const remove = async (id: number) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(Student);
    const course = await repository.findOneBy({ id });
    if (!course) {
      throw Error(ErrorMessages.ERROR_NOT_FOUND_STUDENT);
    }
    return repository.delete(id);
  } catch(error) {
    new Error(ErrorMessages.ERROR_DELETE_ONE);
  } finally {
    dataSource.destroy();
  }
}

const clear = async () => {
  const dataSource = await connection();
  try {
    return dataSource.getRepository(Student).clear();
  } catch(error) {
    new Error(ErrorMessages.ERROR_CLEAR);
  } finally {
    dataSource.destroy();
  }
}

const update = async (data: IUpdateStudentCourseData) => {
  const dataSource = await connection();
  try {
    const repositoryStudent = dataSource.getRepository(Student);
    const repositoryCourse = dataSource.getRepository(Course);
    const repositoryReportCard = dataSource.getRepository(ReportCard);

    const { id, firstName, lastName, email, courseIds, reportCardId } = data;
    const student = await repositoryStudent.findOneBy({ id });
    if (!student) {
      throw new Error(ErrorMessages.ERROR_NOT_FOUND_STUDENT);
    }

    let reportCard: ReportCard;
    if (reportCardId) {
      reportCard = await repositoryReportCard.findOneBy({
        id: reportCardId,
        student: IsNull()
      });
      if (!reportCard) {
        throw new Error(ErrorMessages.ERROR_ALREADY_TIED_COURSE);
      }
    }

    let courses: Array<Course>;
    if (courseIds) {
      courses = await repositoryCourse.find({
        where: {
          id: In(courseIds)
        }
      });
    }

    student.reportCard = reportCard;
    student.courses = courses;
    student.firstName = firstName ?? student.firstName;
    student.lastName = lastName ?? student.lastName;
    student.email = email ?? student.email;
    student.updatedAt = new Date().toDateString();

    return repositoryStudent.save(student);
  } catch(error) {
    new Error(ErrorMessages.ERROR_UPDATE);
  } finally {
    dataSource.destroy();
  }
}

export default {
  find,
  create,
  remove,
  clear,
  update
};
