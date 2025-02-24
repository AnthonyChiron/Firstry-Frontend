import { Address } from './adress.model';
import { GenericModel } from './generic.model';
import { OrganizerModel } from './organizer.model';

export interface ContestModel extends GenericModel {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  registrationEndDate: Date;
  sports: any[];
  categories: any;
  location: Address;
  enablePayment: boolean;
  isPublished: boolean;
  parentalAuthorizationFileUrl: string;
  isFederal: boolean;
  rulesFileUrl: string;
  organizer: OrganizerModel;
  federalRegistrationLink: string;
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
    parentalAuthorizationFileUrl: contest.parentalAuthorizationFileUrl,
    isFederal: contest.isFederal,
    federalRegistrationLink: contest.federalRegistrationLink,
    rulesFileUrl: contest.rulesFileUrl,
    branding: contest.branding,
    socials: contest.socials,
    organizer: contest.organizer,
  };
}
