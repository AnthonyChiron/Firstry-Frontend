import { GenericModel } from './generic.model';

export interface RiderModel extends GenericModel {
  firstName: String;
  lastName: String;
  photoUrl: String;
  gender?: String;
  birthDate: Date;
  sports: [];
  category?: String;
  nationality: String;
  city: String;
  socials?: {
    instagram?: String;
    twitter?: String;
    youtube?: String;
  };
}
