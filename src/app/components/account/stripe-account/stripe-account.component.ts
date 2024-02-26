import { is } from 'date-fns/locale';
import { OrganizersService } from 'src/app/shared/data/OrganizersService/organizers.service';
import { Router } from '@angular/router';
import { PaymentService } from './../../../shared/data/PaymentService/payment.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'stripe-account',
  templateUrl: './stripe-account.component.html',
  styleUrls: ['./stripe-account.component.scss'],
})
export class StripeAccountComponent implements OnInit {
  @Input() user: any;
  displayStripeAccount: boolean = false;
  urlStripeAccount = '';
  isStripeAccountUsable: boolean = true;
  isLoading: boolean = false;

  constructor(
    private paymentService: PaymentService,
    private router: Router,
    private organizersService: OrganizersService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.organizersService
      .isContestPaymentEnabledByOrganizerId(this.user.organizer._id)
      .subscribe((res: boolean) => {
        this.displayStripeAccount = res;
        if (res) {
          this.paymentService
            .isStripeAccountUsable()
            .subscribe((res: boolean) => {
              this.isStripeAccountUsable = res;

              if (res) {
                this.paymentService.createLoginLink().subscribe((data: any) => {
                  this.urlStripeAccount = data.url;
                  this.isLoading = false;
                });
              } else {
                this.paymentService
                  .createOnboardingLink()
                  .subscribe((data: any) => {
                    this.urlStripeAccount = data.url;
                    this.isLoading = false;
                  });
              }
            });
        } else this.isLoading = false;
      });
  }

  test() {
    window.open(this.urlStripeAccount, '_blank');
  }
}
