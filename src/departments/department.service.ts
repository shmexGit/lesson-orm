import { FindOptionsWhere, In } from 'typeorm';
import { Department } from './department.entity';
import { Student } from '../students/student.entity';
import { connection } from '../utils/data-source';
import { ICreateDepartmentData, IUpdateDepartmentData, ErrorMessages } from '../types';

const find = async (where?: FindOptionsWhere<Department>) => {
  const dataSource = await connection();
  try {
    return dataSource.getRepository(Department).find({
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

const create = async (data: ICreateDepartmentData) => {
  const dataSource = await connection();
  try {
    const repositoryDepartment = dataSource.getRepository(Department);
    const repositoryStudent = dataSource.getRepository(Student);

    const { name, studentIds } = data;
    let students: Array<Student>;
    if (studentIds) {
      students = await repositoryStudent.find({
        where: {
          id: In(studentIds)
        }
      });
    }

    const newDepartment = repositoryDepartment.create({
      name,
      students,
      createdAt: new Date().toDateString(),
    });
    return repositoryDepartment.save(newDepartment);
  } catch(error) {
    new Error(ErrorMessages.ERROR_CREATE);
  } finally {
    dataSource.destroy();
  }
}

const remove = async (id: number) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(Department);
    const course = await repository.findOneBy({ id });
    if (!course) {
      throw Error(ErrorMessages.ERROR_NOT_FOUND_DEPARTMENT);
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
    return dataSource.getRepository(Department).clear();
  } catch(error) {
    new Error(ErrorMessages.ERROR_CLEAR);
  } finally {
    dataSource.destroy();
  }
}

const update = async (data: IUpdateDepartmentData) => {
  const dataSource = await connection();
  try {
    const repositoryDepartment = dataSource.getRepository(Department);
    const repositoryStudent = dataSource.getRepository(Student);
    

    const { id, name, studentIds } = data;
    const department = await repositoryDepartment.findOneBy({ id });
    if (!department) {
      throw Error(ErrorMessages.ERROR_NOT_FOUND_DEPARTMENT);
    }

    let students: Array<Student>;
    if (studentIds) {
      students = await repositoryStudent.find({
        where: {
          id: In(studentIds)
        }
      });
    }

    department.students = students.length > 0 ? department.students : undefined;
    department.name = name ?? department.name;
    department.updatedAt = new Date().toDateString();

    return repositoryDepartment.save(department);
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
