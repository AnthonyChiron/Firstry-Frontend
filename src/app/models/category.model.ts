import { GenericModel } from './generic.model';

export interface CategoryModel extends GenericModel {
  name: String;
  description: String;
  cashprize: String;
  sports: [];
  maxRiders: Number;
  registerPrice: Number;
  isQualificationStep: boolean;
  contest: String; // TODO: Mettre un id
}
