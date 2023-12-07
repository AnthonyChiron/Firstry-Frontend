import { GenericModel } from './generic.model';
import { pointCategoryModel } from './pointCategory.model';
import { StepFormatModel } from './stepFormat.model';

export interface RulesModel extends GenericModel {
  name: String;
  description: String;
  stepFormats: StepFormatModel[];
  pointCategories: pointCategoryModel[];
  contestId: String;
}
