import { rolesEnum } from '../constants/rolesEnum';
import { GenericModel } from './generic.model';

export interface UserModel extends GenericModel {
  email: string;
  role: rolesEnum;
  isValid: boolean;
}