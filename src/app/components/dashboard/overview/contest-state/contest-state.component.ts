import { Component, Input, OnInit } from '@angular/core';
import { PaymentService } from 'src/app/shared/data/PaymentService/payment.service';
import { AuthService } from 'src/app/shared/services/AuthService/auth.service';

@Component({
  selector: 'contest-state',
  templateUrl: './contest-state.component.html',
  styleUrls: ['./contest-state.component.scss'],
})
export class ContestStateComponent implements OnInit {
  @Input() contest: any;
  user: any;
  isStripeAccountUsable: boolean = true;
  urlStripeAccount: string = '';
  isLoading: boolean = false;

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
            console.log(data);
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
  }

  goToStripeDashboard() {
    window.open(this.urlStripeAccount, '_blank');
  }
}
