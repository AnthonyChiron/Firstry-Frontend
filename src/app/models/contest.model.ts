import { Address } from './adress.model';
import { GenericModel } from './generic.model';

export interface ContestModel extends GenericModel {
  name: String;
  description: String;
  startDate: Date;
  endDate: Date;
  registrationEndDate: Date;
  sports: [];
  categories: [];
  location: Address;
  branding: {
    logo: String;
    banner: String;
    trailer: String;
  };
  socials: {
    instagram: String;
    twitter: String;
    youtube: String;
    website: String;
  };
}
