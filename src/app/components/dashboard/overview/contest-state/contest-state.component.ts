import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { PaymentService } from 'src/app/shared/data/PaymentService/payment.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';
import { differenceInDays } from 'date-fns';

@Component({
  selector: 'contest-state',
  templateUrl: './contest-state.component.html',
  styleUrls: ['./contest-state.component.scss'],
})
export class ContestStateComponent implements OnInit, OnChanges {
  @Input() contest: any;
  user: any;
  isStripeAccountUsable: boolean = true;
  urlStripeAccount: string = '';
  isLoading: boolean = false;
  nbDaysLeft: number = 0;

  constructor(
    private _authService: AuthService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.user = this._authService.getCurrentUser();
    if (this.user.organizer)
      this.paymentService.isStripeAccountUsable().subscribe((res: boolean) => {
        this.isStripeAccountUsable = res;

        if (res) {
          this.paymentService.createLoginLink().subscribe((data: any) => {
            this.urlStripeAccount = data.url;
            this.isLoading = false;
          });
        } else {
          this.paymentService.createOnboardingLink().subscribe((data: any) => {
            this.urlStripeAccount = data.url;
            this.isLoading = false;
          });
        }
      });

    if (this.contest) {
      this.nbDaysLeft = differenceInDays(
        new Date(this.contest.registrationEndDate),
        new Date()
      );
    }
  }

  ngOnChanges(): void {
    if (this.contest) {
      this.nbDaysLeft = differenceInDays(
        new Date(this.contest.registrationEndDate),
        new Date()
      );
    }
  }

  goToStripeDashboard() {
    window.open(this.urlStripeAccount, '_blank');
  }
}
