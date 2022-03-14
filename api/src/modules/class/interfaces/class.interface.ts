import { IStudent } from 'src/modules/student/interfaces/student.interface';

export interface IClass {
  id?: string;
  name: string;
  students?: [IStudent];
}
