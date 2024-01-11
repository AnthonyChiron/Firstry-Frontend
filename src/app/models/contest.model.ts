import { Address } from './adress.model';
import { GenericModel } from './generic.model';

export interface ContestModel extends GenericModel {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationEndDate: Date;
  sports: any[];
  categories: any[];
  location: Address;
  enablePayment: boolean;
  isPublished: boolean;
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

export function parseContestModel(contest): ContestModel {
  return {
    _id: contest._id,
    name: contest.name,
    description: contest.description,
    startDate: new Date(contest.startDate),
    endDate: new Date(contest.endDate),
    registrationEndDate: new Date(contest.registrationEndDate),
    sports: contest.sports,
    categories: contest.categories,
    location: contest.location,
    enablePayment: contest.enablePayment,
    isPublished: contest.isPublished,
    branding: contest.branding,
    socials: contest.socials,
  };
}
