import { competitionStepEnum } from '../constants/competitionStepEnum';
import { GenericModel } from './generic.model';
import { RegistrationModel } from './registration.model';

export interface PoolModel extends GenericModel {
  registration: String;
  step: String;
  score: Number;
  rank: Number;
  isMissing: Boolean;
  isQualified: Boolean;
  poolNumber: Number;
}

export interface PoolResultDTOModel {
  registration: any;
  step: String;
  score: Number;
  rank: Number;
  isMissing: Boolean;
  isQualified: Boolean;
  poolNumber: Number;
}
