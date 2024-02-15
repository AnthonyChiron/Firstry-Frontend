import { GenericModel } from './generic.model';

export interface RiderModel extends GenericModel {
  firstName: string;
  lastName: string;
  photoUrl: string;
  gender?: string;
  birthDate: Date;
  bio: string;
  sports: [];
  category?: string;
  nationality: any;
  city: string;
  isVerified: boolean;
  socials?: {
    instagram?: string;
    twitter?: string;
    youtube?: string;
    website?: string;
  };
}

export function parseRiderToDTO(rider) {
  return {
    firstName: rider.firstName,
    lastName: rider.lastName,
    birthDate: rider.birthDate,
    bio: rider.bio,
    nationality: rider.nationality,
    city: rider.city,
    sports: rider.sports,
    isVerified: rider.isVerified,
    socials: rider.socials,
  };
}
