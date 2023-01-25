import { FindOptionsWhere } from 'typeorm';
import { ReportCard } from './report-card.entity';
import { connection } from '../utils/data-source';
import { ICreateReportCardData, IUpdateReportCardData, ErrorMessages } from '../types';

const find = async (where?: FindOptionsWhere<ReportCard>) => {
  const dataSource = await connection();
  try {
    return dataSource.getRepository(ReportCard).find({
      where,
      relations: {
        student: true
      },
      order: { createdAt: 'ASC' }
    });
  } catch(error) {
    new Error(ErrorMessages.ERROR_NOT_FOUND_REPORT_CARD);
  } finally {
    dataSource.destroy();
  }
}

const create = async (data: ICreateReportCardData) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(ReportCard);
    const newReportCard = repository.create({
      name: data.name,
      createdAt: new Date().toDateString()
    });
    return repository.save(newReportCard);
  } catch(error) {
    new Error(ErrorMessages.ERROR_CREATE);
  } finally {
    dataSource.destroy();
  }
}

const remove = async (id: number) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(ReportCard);
    const reportCard = await repository.findOneBy({ id });
    if (!reportCard) {
      throw Error(ErrorMessages.ERROR_NOT_FOUND_REPORT_CARD);
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
    return dataSource.getRepository(ReportCard).clear();
  } catch(error) {
    new Error(ErrorMessages.ERROR_CLEAR);
  } finally {
    dataSource.destroy();
  }
}

const update = async (data: IUpdateReportCardData) => {
  const dataSource = await connection();
  try {
    const repository = dataSource.getRepository(ReportCard);

    const { id, name } = data;
    const reportCard = await repository.findOneBy({ id });
    if (!reportCard) {
      throw Error(ErrorMessages.ERROR_NOT_FOUND_REPORT_CARD);
    }

    reportCard.name = name;
    reportCard.updatedAt = new Date().toDateString();
    return repository.save(reportCard);
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
