import { FindOptionsWhere } from 'typeorm';
import { Course } from './course.entity';
import { connection } from '../utils/data-source';
import { ICreateCourseData, IUpdateCourseData, ErrorMessages } from '../types';

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

const create = async (data: ICreateCourseData) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(Course);
    const newCourse = repository.create({
      name: data.name,
      createdAt: new Date().toDateString()
    });
    return repository.save(newCourse);
  } catch(error) {
    new Error(ErrorMessages.ERROR_CREATE);
  } finally {
    dataSource.destroy();
  }
}

const remove = async (id: number) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(Course);
    const course = await repository.findOneBy({ id });
    if (!course) {
      throw Error(ErrorMessages.ERROR_NOT_FOUND_COURSE);
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
    return dataSource.getRepository(Course).clear();
  } catch(error) {
    new Error(ErrorMessages.ERROR_CLEAR);
  } finally {
    dataSource.destroy();
  }
}

const update = async (data: IUpdateCourseData) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(Course);

    const { id, name } = data;
    const course = await repository.findOneBy({ id });
    if (!course) {
      throw Error(ErrorMessages.ERROR_NOT_FOUND_COURSE);
    }

    course.name = name;
    course.updatedAt = new Date().toDateString();
    return repository.save(course);
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
