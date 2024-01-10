import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaiementComponent } from './paiement.component';
import {
  NgxStripeModule,
  StripeCardComponent,
  StripeElementsService,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
} from '@stripe/stripe-js';
import { FormSharedModule } from '../../formShared.module';

@NgModule({
  declarations: [PaiementComponent],
  imports: [
    CommonModule,
    StripePaymentElementComponent,
    StripeCardComponent,
    SharedModule,
    FormSharedModule,
    NgxStripeModule.forRoot(
      'pk_test_51OPhx3ExeV2TEn3k0EWYu7LkqusSy8cewkqOMeV6ydwt6ICp84mIxzw2oPzyh8v3awLSP9ymlJqrx2ysjS00TKlU00yuzgNMzN'
    ),
  ],
  exports: [PaiementComponent],
})
export class PaiementModule {}
