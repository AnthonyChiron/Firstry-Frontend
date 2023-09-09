import { rolesEnum } from '../constants/rolesEnum';
import { GenericModel } from './generic.model';

export interface RegisterModel extends GenericModel {
  email: String;
  password: String;
  role: rolesEnum;
}
