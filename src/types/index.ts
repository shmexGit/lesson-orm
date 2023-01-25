export enum EntityNames {
  STUDENTS = 'students',
  COURSES = 'courses',
  DEPARTMENTS = 'departments',
  REPORT_CARD = 'report-cards',
}

export enum ActionNames {
  CREATE = 'create',
  DELETE = 'delete',
  UPDATE = 'update',
  SELECT = 'select',
  CLEAR = 'clear',
}

export enum ErrorMessages {
  ERROR_NOT_FOUND_COURSE = 'Not found course',
  ERROR_ALREADY_TIED_COURSE = 'Already tied course',
  ERROR_NOT_FOUND_DEPARTMENT = 'Not found department',
  ERROR_NOT_FOUND_STUDENT = 'Not found student',
  ERROR_NOT_FOUND_REPORT_CARD = 'Not found report card',
  ERROR_FIND_CONDITIONS = 'Wrong search terms',
  ERROR_CREATE = 'Error create',
  ERROR_DELETE_ONE = 'Error delete one',
  ERROR_CLEAR = 'Error clear',
  ERROR_UPDATE = 'Error update',
  ERROR_CONNECTION = 'Error connection to DB',
}

export interface ICommandOptions {
  entity?: string;
  action?: string;
  conditions?: string;
  id?: string;
  data?: string;
}

export interface ICreateCourseData {
  name: string;
}

export interface IUpdateCourseData {
  id: number;
  name: string;
}

export interface ICreateReportCardData {
  name: string;
}

export interface IUpdateReportCardData {
  id: number;
  name: string;
}

export interface ICreateStudentData {
  firstName: string;
  lastName: string;
  email: string;
  courseIds?: Array<number>;
  reportCardId?: number;
}

export interface IUpdateStudentCourseData {
  id: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  courseIds?: Array<number>;
  reportCardId?: number;
}

export interface ICreateDepartmentData {
  name: string;
  studentIds?: Array<number>;
}

export interface IUpdateDepartmentData {
  id: number;
  name?: string;
  studentIds?: Array<number>;
}
