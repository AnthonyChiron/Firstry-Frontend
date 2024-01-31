import { GenericModel } from './generic.model';
import { StepModel } from './step.model';

export interface CategoryModel extends GenericModel {
  name: String;
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
    sports: [];
    maxRiders: Number;
    registerPrice: Number;
    isQualificationStep: boolean;
    contestId: String;
  };
  steps: any[];
  stepsId: String[];
}

export interface CategoryRegistrationModelDTO {
  name: String;
  sports: [];
  maxRiders: Number;
  NbRegistration: Number;
  registerPrice: Number;
  isQualificationStep: boolean;
  contestId: String;
  steps: any[];
}
