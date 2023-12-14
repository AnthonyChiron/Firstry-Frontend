import { Address } from './adress.model';
import { GenericModel } from './generic.model';

export interface ContestModel extends GenericModel {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationEndDate: Date;
  sports: any[];
  categories: [];
  location: Address;
  branding: {
    logo: string;
    banner: string;
    poster: string;
    trailer: string;
  };
  socials: {
    instagram: string;
    twitter: string;
    youtube: string;
    website: string;
  };
}

export function parseToContestModel(data: any): ContestModel {
  return {
    _id: data._id,
    name: data.name,
    description: data.description,
    startDate: new Date(data.startDate),
    endDate: new Date(data.endDate),
    registrationEndDate: data.registrationEndDate,
    sports: data.sports,
    categories: data.categories,
    location: data.location,
    branding: data.branding,
    socials: data.socials,
  };
}
