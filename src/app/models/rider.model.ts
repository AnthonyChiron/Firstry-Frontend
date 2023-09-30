import { GenericModel } from './generic.model';

export interface RiderModel extends GenericModel {
  firstName: string;
  lastName: string;
  photoUrl: string;
  gender?: string;
  birthDate: Date;
  sports: [];
  category?: string;
  nationality: any;
  city: string;
  socials?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
}
