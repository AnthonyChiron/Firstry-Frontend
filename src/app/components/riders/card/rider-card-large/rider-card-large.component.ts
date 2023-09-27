import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiderModel } from 'src/app/models/rider.model';
import { RidersService } from 'src/app/shared/data/RidersService/riders.service';

@Component({
  selector: 'rider-card-lg',
  templateUrl: './rider-card-large.component.html',
  styleUrls: ['./rider-card-large.component.scss'],
})
export class RiderCardLargeComponent {
  @Input() rider!: RiderModel;
  isLoading: boolean = false;

  constructor(
    private riderService: RidersService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    console.log(this.rider);
    if (!this.rider) {
      this.isLoading = true;
      this.activatedRoute.params.subscribe((params) => {
        this.riderService.getById(params['id']).subscribe((rider) => {
          console.log(rider);
          this.rider = rider;
          this.isLoading = false;
        });
      });
    }
  }
}
