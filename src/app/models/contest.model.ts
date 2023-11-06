import { Address } from './adress.model';
import { GenericModel } from './generic.model';

export interface ContestModel extends GenericModel {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationEndDate: Date;
  sports: [];
  categories: [];
  location: Address;
  branding: {
    logo: string;
    banner: string;
    trailer: string;
  };
  socials: {
    instagram: string;
    twitter: string;
    youtube: string;
    website: string;
  };
}
