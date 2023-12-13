import { Injectable } from '@angular/core';
import { FormUtilityService } from './form-utility.service';

@Injectable({
  providedIn: 'root',
})
export class FormRulesService extends FormUtilityService {
  constructor() {
    super();
  }
}
