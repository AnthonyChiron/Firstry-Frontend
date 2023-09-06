import { GenericModel } from './generic.model';

export interface CategoryModel extends GenericModel {
  name: String;
  description: String;
  cashprize: String;
  startDate: Date;
  endDate: Date;
  sports: [];
  rules: String; // TODO: Mettre un id
  maxCompetitorCount: Number;
  contest: String; // TODO: Mettre un id
}
