import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardTypeService } from '@justa/payment-inputs';

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
      cardNumber: [null],
      cardCvc: [null],
      cardValidate: [null],
    });
  }
}
