import { OrganizerModel } from './organizer.model';
import { rolesEnum } from '../constants/rolesEnum';
import { ContestModel } from './contest.model';
import { GenericModel } from './generic.model';
import { RiderModel } from './rider.model';

export interface SignUpModel extends GenericModel {
  email: string;
  password: string;
  role: rolesEnum;
  rider: RiderModel;
  organizer: OrganizerModel;
}
