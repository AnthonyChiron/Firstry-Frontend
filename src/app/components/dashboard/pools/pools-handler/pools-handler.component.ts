import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { RegistrationModel } from 'src/app/models/registration.model';
import { RiderModel } from 'src/app/models/rider.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { PoolsService } from 'src/app/shared/data/PoolsService/pools.service';

@Component({
  selector: 'pools-handler',
  templateUrl: './pools-handler.component.html',
  styleUrls: ['./pools-handler.component.scss'],
})
export class PoolsHandlerComponent implements OnInit, OnChanges {
  @Input() category: CategoryModel;
  @Input() registrations: RegistrationModel[];
  isNewPools: boolean = true;
  originalPools: any;
  pools: any[][] = [];
  ridersPerPool: number = 3;
  poolsIds = [];
  currentStepId: string;
  edit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  perPoolOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
  ];

  constructor(private _poolsService: PoolsService) {}

  async ngOnInit() {
    this.isLoading = true;
    this.currentStepId = this.category.steps[0]._id;
    await this.getPoolFromDb();
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.pools = [];
    this.edit = false;
    this.currentStepId = this.category.steps[0]._id;
    await this.getPoolFromDb();

    if (this.registrations && this.isNewPools)
      this.formatPoolsFromRegistrations(this.registrations);
  }

  selectPerPool(event) {
    this.ridersPerPool = event;
    this.formatPoolsOnRiderPerPoolChange();
  }

  updatePoolsIds() {
    this.poolsIds = this.pools.map((_, index) => `pool-${index}`);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  formatPoolsFromRegistrations(registrations: RegistrationModel[]): void {
    const riders = registrations.map((registration) => registration);

    if (riders.length === 0) return;
    if (riders.length < this.ridersPerPool) {
      this.pools = [[...riders]];
      return;
    }
    let nbPools = Math.ceil(riders.length / this.ridersPerPool);
    const nbRiderLeft = riders.length % this.ridersPerPool;

    // Si nbRiderLeft est 1 ou 2, réduisez le nombre total de poules de 1
    if (nbRiderLeft === 1 || nbRiderLeft === 2) {
      nbPools--;
    }

    const pools = [];
    for (let i = 0; i < nbPools; i++) {
      pools.push(
        riders.slice(i * this.ridersPerPool, (i + 1) * this.ridersPerPool)
      );
    }

    // Ajouter les riders restants à la dernière poule, si nécessaire
    if (nbRiderLeft === 1 || nbRiderLeft === 2) {
      pools[pools.length - 1] = pools[pools.length - 1].concat(
        riders.slice(-nbRiderLeft)
      );
    }

    this.pools = [...pools];
    this.updatePoolsIds(); // Mise à jour des identifiants si nécessaire
  }

  formatPoolsFromDb(pools: any[]) {
    this.pools = pools.reduce((acc, pool) => {
      const poolNumber = pool.poolNumber - 1;
      if (!acc[poolNumber]) acc[poolNumber] = [];
      acc[poolNumber].push(pool.registration);

      return acc;
    }, []);
  }

  formatPoolsOnRiderPerPoolChange() {
    // Format pools by rider per pool
    const riders = this.pools.flat();
    this.formatPoolsFromRegistrations(riders);
  }

  cancel() {
    this.edit = false;
    this.isError = false;

    if (this.isNewPools) this.formatPoolsFromRegistrations(this.registrations);
    else this.formatPoolsFromDb(this.originalPools);
  }

  submit() {
    // Parcourir les pools et créer un tableau avec numéro de pool, registrationId
    const pools = [];

    // Check si une pool est vide
    for (let i = 0; i < this.pools.length; i++) {
      if (this.pools[i].length === 0) {
        this.isError = true;
        this.errorMessage = `La poule ${
          i + 1
        } est vide. Vous ne pouvez pas soumettre de poules vides.`;
        this.isLoading = false;
        return;
      }
    }

    this.edit = false;
    this.isLoading = true;

    this.pools.forEach((pool, index) => {
      pool.forEach((rider) => {
        pools.push({
          poolNumber: index + 1,
          registrationId: rider._id,
          stepId: this.currentStepId,
        });
      });
    });

    if (this.isNewPools)
      this._poolsService
        .createPools(this.currentStepId, pools)
        .subscribe((pools) => {
          this.originalPools = [...pools];
          this.isNewPools = false;
          this.isLoading = false;
        });
    else
      this._poolsService
        .updatePools(this.currentStepId, pools)
        .subscribe((pools) => {
          this.originalPools = [...pools];
          this.isNewPools = false;
          this.isLoading = false;
        });
  }

  async getPoolFromDb() {
    this._poolsService
      .getPoolsByStepId(this.currentStepId)
      .subscribe((pools: any) => {
        this.originalPools = [...pools];
        console.log(pools);

        if (pools.length > 0) {
          this.pools = pools.map((pool) => pool.riders);
          this.isNewPools = false;
          this.formatPoolsFromDb(pools);
          this.updatePoolsIds();
        } else {
          this.isNewPools = true;
        }

        this.isLoading = false;
      });
  }
}