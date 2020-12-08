import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardTypeService, PaymentInputValidators } from '@justa/payment-inputs';

@Component({
  selector: 'jst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder, private cardType: CardTypeService) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      cardNumber: [null, Validators.compose([PaymentInputValidators.cardNumber()])],
      cardCvc: [null, Validators.compose([PaymentInputValidators.expiryDate()])],
      cardValidate: [null, Validators.compose([PaymentInputValidators.CVC()])],
    });
  }
}
