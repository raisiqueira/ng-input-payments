import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardNumberDirective } from './directives/card-number.directive';
import { CardTypeService } from './services/card-type.service';
import { CardExpireDateDirective } from './directives/card-expire-date.directive';
import { CardCvvDirective } from './directives/card-cvv.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [CardNumberDirective, CardExpireDateDirective, CardCvvDirective],
  exports: [CardNumberDirective, CardExpireDateDirective, CardCvvDirective],
  providers: [CardTypeService],
})
export class PaymentInputsModule {}
