import { DataSource } from 'typeorm';

import { typeormConfig } from '../configs/typeorm.config';
import { ErrorMessages } from '../types';

const dataSource = new DataSource(typeormConfig);

export const connection = async () => {
  try {
    await dataSource.initialize();
    console.log('Connection to DB!');
    return dataSource;
  } catch(error) {
    throw new Error(ErrorMessages.ERROR_CONNECTION);
  }
}