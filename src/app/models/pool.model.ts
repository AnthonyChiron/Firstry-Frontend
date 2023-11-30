import { competitionStepEnum } from '../constants/competitionStepEnum';
import { rolesEnum } from '../constants/rolesEnum';
import { GenericModel } from './generic.model';

export interface PoolModel extends GenericModel {
  registration: String;
  step: String;
  score: Number;
  rank: Number;
  isQualified: Boolean;
  poolNumber: Number;
}
