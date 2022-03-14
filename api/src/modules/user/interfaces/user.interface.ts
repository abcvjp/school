import { UserRole } from '../schemas/user.schema';

export interface IUser {
  _id?: string;
  role: UserRole;
  isEnabled: boolean;
  fullName: string;
  email: string;
  phoneNumber: string;
  avatar?: string;
  passwordHash?: string;
}
