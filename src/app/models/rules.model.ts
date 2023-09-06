import { GenericModel } from './generic.model';
import { pointDistributionModel } from './pointDistribution.model';

export interface RulesModel extends GenericModel {
  name: String;
  description: String;
  format: String;
  pointDistribution: pointDistributionModel[];
  competitorPerPool: Number;
  competitorQualifiedCount: Number;
  jamTimer: Number;
  runTimer: Number;
}
