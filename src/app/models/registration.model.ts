import { GenericModel } from './generic.model';

export interface RegistrationModel extends GenericModel {
  rider: String;
  category: String;
  state: String;
}
