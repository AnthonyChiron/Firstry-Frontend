import { rolesEnum } from '../constants/rolesEnum';
import { GenericModel } from './generic.model';
import { RiderModel } from './rider.model';

export interface UserModel extends GenericModel {
  email: string;
  newEmail?: string;
  role: rolesEnum;
  isValid: boolean;
  rider?: RiderModel;
  organizer?: {};
  riderId?: string;
  organizerId?: string;
}
