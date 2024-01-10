import { GenericModel } from './generic.model';

export interface OrganizerModel extends GenericModel {
  name: String;
  socials?: {
    instagram: String;
    twitter: String;
    youtube: String;
    website: String;
  };
}
