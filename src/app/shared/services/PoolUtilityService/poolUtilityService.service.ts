import { Injectable } from '@angular/core';
import { PoolModel } from 'src/app/models/pool.model';
import { StepModel } from 'src/app/models/step.model';

@Injectable({
  providedIn: 'root',
})
export class PoolUtilityService {
  getPoolCurrentStep(steps: StepModel[]) {
    return steps.find((step) => step.state === 'POOL_PENDING');
  }

  getResultCurrentStep(steps: StepModel[]) {
    return steps.find(
      (step) => step.state === 'POOL_READY' || step.state === 'RESULT_PENDING'
    );
  }

  formatPoolsFromDb(pools: any[]): PoolModel[][] {
    return pools.reduce((acc, pool) => {
      const poolNumber = pool.poolNumber - 1;
      if (!acc[poolNumber]) acc[poolNumber] = [];
      acc[poolNumber].push(pool.registration);

      return acc;
    }, []);
  }
}
