import { competitionStepEnum } from '../constants/competitionStepEnum';
import { GenericModel } from './generic.model';

export interface PoolModel extends GenericModel {
  registration: String;
  step: String;
  score: Number;
  rank: Number;
  isQualified: Boolean;
  poolNumber: Number;
}
