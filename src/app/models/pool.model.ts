import { competitionStepEnum } from '../constants/competitionStepEnum';
import { rolesEnum } from '../constants/rolesEnum';
import { GenericModel } from './generic.model';

export interface PoolModel extends GenericModel {
  registration: String;
  contest: String;
  score: Number;
  rank: Number;
  step: competitionStepEnum;
  isQualified: Boolean;
  pool: Number;
}
