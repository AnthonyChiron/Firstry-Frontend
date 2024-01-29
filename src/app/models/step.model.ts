import { GenericModel } from './generic.model';

export interface StepModel extends GenericModel {
  categoryId: String; // TODO: Mettre un id
  name: String;
  state: String;
  rules: String;
  startDate: Date;
  endDate: Date;
  ridersPerPool: Number;
  ridersQualifiedCount: Number;
}

export interface StepModelDTO {
  categoryId: String;
  name: String;
  state: String;
  rules: String;
  startDate: Date;
  endDate: Date;
  ridersPerPool: Number;
  ridersQualifiedCount: Number;
}

export function stepModelToDTO(step: StepModel): StepModelDTO {
  return {
    categoryId: step.categoryId,
    name: step.name,
    state: step.state,
    rules: step.rules,
    startDate: new Date(step.startDate),
    endDate: new Date(step.endDate),
    ridersPerPool: step.ridersPerPool,
    ridersQualifiedCount: step.ridersQualifiedCount,
  };
}
