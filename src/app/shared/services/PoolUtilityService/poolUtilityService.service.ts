import { Injectable } from '@angular/core';
import { PoolModel, PoolResultDTOModel } from 'src/app/models/pool.model';
import { StepModel } from 'src/app/models/step.model';

@Injectable({
  providedIn: 'root',
})
export class PoolUtilityService {
  getPoolCurrentStep(steps: StepModel[]) {
    if (steps.find((step) => step.isResultPublished) && steps.length > 1)
      return steps[1];

    if (steps.find((step) => !step.isResultPublished)) return steps[0];

    return steps[steps.length - 1];
  }

  getResultCurrentStep(steps: StepModel[]) {
    if (steps.find((step) => step.isResultPublished) && steps.length > 1)
      return steps[1];

    if (steps.find((step) => !step.isResultPublished)) return steps[0];

    return steps[steps.length - 1];
  }

  formatPoolsFromDb(pools: any[]): PoolResultDTOModel[][] {
    return pools.reduce((acc, pool) => {
      const poolNumber = pool.poolNumber - 1;
      if (!acc[poolNumber]) acc[poolNumber] = [];
      acc[poolNumber].push(pool);

      return acc;
    }, []);
  }

  checkIfAllPoolsHaveResults(pools: PoolResultDTOModel[]): boolean {
    return pools.every((pool) => pool.score);
  }
}
