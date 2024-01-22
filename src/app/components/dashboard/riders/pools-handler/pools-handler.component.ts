import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { RegistrationModel } from 'src/app/models/registration.model';
import { RiderModel } from 'src/app/models/rider.model';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'pools-handler',
  templateUrl: './pools-handler.component.html',
  styleUrls: ['./pools-handler.component.scss'],
})
export class PoolsHandlerComponent implements OnChanges {
  @Input() category: CategoryModel;
  @Input() registrations: RegistrationModel[];
  pools: any[][] = [];
  ridersPerPool: number = 3;
  poolsIds = ['pool-0', 'pool-1', 'pool-2', 'pool-3', 'pool-4', 'pool-5'];

  perPoolOptions = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
    { label: '6', value: 6 },
  ];

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (this.registrations) this.createPools(this.registrations);
  }

  selectPerPool(event) {
    this.ridersPerPool = event;
    this.createPools(this.registrations);
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

  createPools(registrations: RegistrationModel[]) {
    console.log(registrations);

    const riders = registrations.map((registration) => registration.rider);
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

    console.log(pools);

    this.pools = [...pools];
    this.updatePoolsIds(); // Mise à jour des identifiants si nécessaire

    return pools;
  }
}
