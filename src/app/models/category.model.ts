import { GenericModel } from './generic.model';
import { StepModel } from './step.model';

export interface CategoryModel extends GenericModel {
  name: String;
  description: String;
  sports: [];
  maxRiders: Number;
  registerPrice: Number;
  isQualificationStep: boolean;
  steps: StepModel[];
  contestId: String;
}

export interface CategoryModelDTO {
  category: {
    name: String;
    description: String;
    sports: [];
    maxRiders: Number;
    registerPrice: Number;
    isQualificationStep: boolean;
    contestId: String;
  };
  steps: any[];
  stepsId: String[];
}
