import { GenericModel } from './generic.model';
import { pointDistributionModel } from './pointDistribution.model';
import { StepFormatModel } from './stepFormat.model';

export interface RulesModel extends GenericModel {
  name: String;
  description: String;
  format: StepFormatModel[];
  pointDistribution: pointDistributionModel[];
  contestId: String;
}
