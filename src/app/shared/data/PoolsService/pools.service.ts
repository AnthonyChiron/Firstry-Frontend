import { Injectable } from '@angular/core';
import { CrudService } from '../CRUDService/crud.service';
import { HttpClient } from '@angular/common/http';
import { PoolModel } from 'src/app/models/pool.model';
import { AuthService } from '../../services/AuthService/auth.service';

@Injectable({
  providedIn: 'root',
})
export class PoolsService extends CrudService<PoolModel> {
  constructor(http: HttpClient, authService: AuthService) {
    super(http, authService, 'pools');
  }

  getPoolsByStepId(stepId: string) {
    return this.http.get<PoolModel[]>(
      `${this.baseUrl}/getPoolsByStepId/${stepId}`
    );
  }

  getFinalPoolsByStepId(stepId: string) {
    return this.http.get<PoolModel[]>(
      `${this.baseUrl}/getFinalPoolsByStepId/${stepId}`
    );
  }

  createPools(stepId: string, pools: any[]) {
    return this.http.post<PoolModel[]>(
      `${this.baseUrl}/createPoolsByStepId/${stepId}`,
      {
        poolsEntries: pools,
      }
    );
  }

  updatePools(stepId: string, pools: any[]) {
    return this.http.post<PoolModel[]>(
      `${this.baseUrl}/updatePoolsByStepId/${stepId}`,
      {
        poolsEntries: pools,
      }
    );
  }

  updatePoolResult(pools: any[], stepId) {
    return this.http.post<PoolModel[]>(
      `${this.baseUrl}/updatePoolResult/${stepId}`,
      {
        poolsEntries: pools,
      }
    );
  }

  publishResult(stepId: string) {
    return this.http.post<PoolModel[]>(
      `${this.baseUrl}/publishResult/${stepId}`,
      {}
    );
  }

  unpublishResult(stepId: string) {
    return this.http.post<PoolModel[]>(
      `${this.baseUrl}/unpublishResult/${stepId}`,
      {}
    );
  }
}
