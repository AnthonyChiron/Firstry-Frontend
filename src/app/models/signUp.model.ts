import { OrganizerModel } from './organizer.model';
import { ContestModel } from './contest.model';
import { GenericModel } from './generic.model';
import { RiderModel } from './rider.model';
import { UserModel } from './user.model';

export interface SignUpModel extends GenericModel {
  user: UserModel;
  rider: RiderModel;
  organizer: OrganizerModel;
}
