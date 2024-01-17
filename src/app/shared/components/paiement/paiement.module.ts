import { SharedModule } from './../../shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaiementComponent } from './paiement.component';
import {
  NgxStripeModule,
  StripeCardComponent,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import { FormSharedModule } from '../../formShared.module';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [PaiementComponent],
  imports: [
    CommonModule,
    StripePaymentElementComponent,
    StripeCardComponent,
    SharedModule,
    FormSharedModule,
    NgxStripeModule.forRoot(environment.stripe_public_key),
  ],
  exports: [PaiementComponent],
})
export class PaiementModule {}
