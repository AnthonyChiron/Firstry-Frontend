import { GenericModel } from './generic.model';

export interface StepModel extends GenericModel {
  name: String;
  rules: String;
  startDate: Date;
  endDate: Date;
  category: String; // TODO: Mettre un id
}
