import { rolesEnum } from '../constants/rolesEnum';
import { GenericModel } from './generic.model';

export interface SignUpModel extends GenericModel {
  email: string;
  password: string;
  role: rolesEnum;
}
