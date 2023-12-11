import { GenericModel } from './generic.model';
import { StepModel } from './step.model';

export interface CategoryModel extends GenericModel {
  name: String;
  description: String;
  cashprize: String;
  sports: [];
  maxRiders: Number;
  registerPrice: Number;
  isQualificationStep: boolean;
  steps: StepModel[];
  contest: String; // TODO: Mettre un id
}
