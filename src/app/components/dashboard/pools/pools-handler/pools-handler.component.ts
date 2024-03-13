import { OrganizerInfoFormComponent } from './../../../account/organizer-info-form/organizer-info-form.component';
import { filter } from 'rxjs';
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
import { PoolUtilityService } from 'src/app/shared/services/PoolUtilityService/poolUtilityService.service';
import { compilePipeFromMetadata } from '@angular/compiler';
import { th } from 'date-fns/locale';

@Component({
  selector: 'pools-handler',
  templateUrl: './pools-handler.component.html',
  styleUrls: ['./pools-handler.component.scss'],
})
export class PoolsHandlerComponent implements OnInit, OnChanges {
  @Input() category: CategoryModel;
  @Input() registrations: RegistrationModel[];

  edit: boolean = false;
  isLoading: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';

  isNewPools: boolean = true;
  originalPoolsEntries: any;
  currentStep: any;
  stepsOptions: any[] = [];
  displayStepDropdown: boolean = false;

  missing: any[] = [];
  pools: any[][] = [];
  poolsIds = [];
  ridersPerPool: number = 3;
  perPoolOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
    { label: '7', value: 7 },
  ];

  constructor(
    private _poolsService: PoolsService,
    private _poolUtilityService: PoolUtilityService
  ) {}

  async ngOnInit() {
    this.isLoading = true;

    this.initCurrentStep();
    await this.getPoolFromDb();
  }

  async ngOnChanges(changes: SimpleChanges) {
    this.pools = [];
    this.missing = [];
    this.edit = false;

    this.initCurrentStep();
    await this.getPoolFromDb();

    if (
      (this.registrations && this.isNewPools) ||
      (this.registrations &&
        this.registrations.length !== this.originalPoolsEntries.length)
    )
      this.createPoolsFromRegistrations(this.registrations);
  }

  initCurrentStep() {
    this.stepsOptions = this.category.steps.map((step) => {
      return { label: step.name, value: step._id };
    });

    this.currentStep = this._poolUtilityService.getPoolCurrentStep(
      this.category.steps
    );
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

  cancel() {
    this.edit = false;
    this.isError = false;

    if (this.isNewPools) this.createPoolsFromRegistrations(this.registrations);
    else this.formatPoolsEntriesToRegistrations(this.originalPoolsEntries);
  }

  submit() {
    this.isLoading = true;

    // Check si une pool est vide && afficher un message d'erreur
    if (this.checkEmptyPool() === true) return;

    this.isError = false;
    this.edit = false;

    if (this.isNewPools)
      this._poolsService
        .createPools(this.currentStep._id, this.formatIntoPoolsEntries())
        .subscribe((pools) => {
          this.originalPoolsEntries = [...pools];
          this.isNewPools = false;
          this.isLoading = false;
        });
    else
      this._poolsService
        .updatePools(this.currentStep._id, this.formatIntoPoolsEntries())
        .subscribe((pools) => {
          this.originalPoolsEntries = [...pools];
          this.isNewPools = false;
          this.isLoading = false;
        });
  }

  async getPoolFromDb() {
    this.isLoading = true;
    this._poolsService
      .getPoolsByStepId(this.currentStep._id)
      .subscribe((pools: any) => {
        this.originalPoolsEntries = [...pools];
        console.log('pools', pools);

        if (
          this.category.steps.find((step) => step.isResultPublished === true) &&
          pools.length === 0
        ) {
          this._poolsService
            .getFinalPoolsByStepId(
              this.category.steps.find(
                (step) =>
                  step.isResultPublished === true &&
                  step.name == 'QUALIFICATION'
              )._id
            )
            .subscribe((pools: any) => {
              this.isNewPools = false;
              this.formatPoolsEntriesToRegistrations(pools);
            });
        } else {
          if (pools.length > 0) {
            this.isNewPools = false;
            this.formatPoolsEntriesToRegistrations(pools);
          } else this.isNewPools = true;
        }
        this.isStepFinaleAvailable();
        this.isLoading = false;
      });
  }

  createPoolsFromRegistrations(registrations: RegistrationModel[]): void {
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

  formatPoolsEntriesInDoubleTable(pools: any[]) {
    return pools.reduce((acc, pool) => {
      const poolNumber = pool.poolNumber - 1;
      if (!acc[poolNumber]) acc[poolNumber] = [];
      acc[poolNumber].push(pool.registration);

      return acc;
    }, []);
  }

  formatPoolsEntriesToRegistrations(pools) {
    this.missing = this.originalPoolsEntries.filter((pool) => pool.isMissing);
    console.log(this.missing);
    this.missing = this.missing.map((pool) => pool.registration);
    console.log(this.missing);

    this.pools = this.formatPoolsEntriesInDoubleTable(
      pools.filter((pool) => pool.isMissing === false)
    );
    this.updatePoolsIds();
  }

  formatIntoPoolsEntries() {
    let pools = [];
    let missing = [];

    // Format pools
    this.pools.forEach((pool, index) => {
      pool.forEach((registration) => {
        pools.push({
          isMissing: false,
          poolNumber: index + 1,
          registrationId: registration._id,
          stepId: this.currentStep._id,
        });
      });
    });

    // Format missing
    missing = this.missing.map((registration) => {
      return {
        isMissing: true,
        poolNumber: 0,
        registrationId: registration._id,
        stepId: this.currentStep._id,
      };
    });

    pools = pools.concat(missing);

    return pools;
  }

  isStepFinaleAvailable() {
    // Check if qualif step is published
    const qualifStep = this.category.steps.find(
      (step) => step.name === 'QUALIFICATION'
    );
    if (qualifStep.isResultPublished === false)
      this.displayStepDropdown = false;
    return (this.displayStepDropdown = true);
  }

  async selectStep(event) {
    this.edit = false;
    this.currentStep = this.category.steps.find((step) => step._id === event);

    await this.getPoolFromDb();
  }

  selectPerPool(event) {
    this.ridersPerPool = event;
    const pools = this.pools.flat();
    this.createPoolsFromRegistrations(pools);
  }

  checkEmptyPool() {
    for (let i = 0; i < this.pools.length; i++) {
      if (this.pools[i].length === 0) {
        this.isError = true;
        this.errorMessage = `La poule ${
          i + 1
        } est vide. Vous ne pouvez pas soumettre de poules vides.`;
        this.isLoading = false;
        return true;
      }
    }
    return false;
  }

  updatePoolsIds() {
    this.poolsIds = this.pools.map((_, index) => `pool-${index}`);
    this.poolsIds.push('missing');
  }
}
