import { GenericModel } from './generic.model';

export interface StepModel extends GenericModel {
  category: String; // TODO: Mettre un id
  name: String;
  rules: String;
  startDate: Date;
  endDate: Date;
  ridersPerPool: Number;
  ridersQualifiedCount: Number;
}
