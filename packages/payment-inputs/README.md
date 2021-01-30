<h1 align="center">ngx-payment-inputs</h1>

<p align="center">
A set of Angular Directives to validate and format credit card inputs.
</p>

![npm](https://img.shields.io/npm/v/ngx-payment-inputs?color=%23076e95) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/ngx-payment-inputs?color=%23076e95) ![npm](https://img.shields.io/npm/dw/ngx-payment-inputs?color=%23076e95)

## Install

Before install the library, check if your Angular version are >=10.0.0

NPM

```bash
npm i --save ngx-payment-inputs
```

Yarn

```bash
yarn add ngx-payment-inputs
```

## Usage

Import the main module into your feature module (example.: `app.module.ts`):

```diff
import { PaymentInputsModule } from 'ngx-payment-inputs';

// rest of code...

@NgModule({
  declarations: [AppComponent],
  imports: [
      BrowserModule,
      ReactiveFormsModule,
+     PaymentInputsModule,
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Now, go to your formGroup (or FormControl), and create all controls necessaries for usage (card number, card expiry date, card cvc).

```ts
// your feature component
// rest of code...

  ngOnInit(): void {
    this.form = this.fb.group({
      cardNumber: [null],
      cardCvc: [null],
      cardValidate: [null],
    });
  }

  // rest of code...
```

Into your HTML, add `jstCardNumber`, `jstCardExpireDate` and `jstCardCvv` for respectives inputs.

```html
<form [formGroup]="form">
  <div>
    <label for="card-number">Card Number</label>
    <input id="card-number" formControlName="cardNumber" jstCardNumber />
  </div>

  <div>
    <label for="card-date">Card Date</label>
    <input id="card-date" formControlName="cardValidate" jstCardExpireDate />
  </div>

  <div>
    <label for="card-cvv">Card CVV</label>
    <input id="card-cvv" formControlName="cardCvc" jstCardCvv />
  </div>
</form>
```

## Using custom validators

`ngx-payment-inputs` provides three custom validators to help to show errors form all credit card inputs.

- `PaymentInputValidators.cardNumber()`
- `PaymentInputValidators.expiryDate()`
- `PaymentInputValidators.CVC()`

Example of usage:

```ts
// rest of code
import { CardTypeService, PaymentInputValidators } from 'ngx-payment-inputs';
// ...

  ngOnInit(): void {
    this.form = this.fb.group({
      cardNumber: [null, [PaymentInputValidators.cardNumber()],
      cardCvc: [null, [PaymentInputValidators.expiryDate()],
      cardValidate: [null, [PaymentInputValidators.CVC()],
    });
  }
```

## Hacking your forms with `ngx-payment-inputs` service

This library not provide a component (yet 😏) with all credit card inputs, instead of this, provide three Angular Directives that made all job for you, and let the developer free to customize the input, but you can improve the user experience showing the credit card brand, for example.

To help the developer, we provide a service that exposes the card type as observable, see the below example:

```ts
// rest of code
import { CardTypeService } from 'ngx-payment-inputs';

@Component({
  selector: 'jst-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  type: string;

  constructor(private cardTypeService: CardTypeService) {}

  ngOnInit(): void {
    this.cardTypeService.cardType.subscribe((type) => (this.type = type.type));
  }
}
```

With this, you can show a credit card brand into your HTML based into type returned from our service.

See all credit card types (all values are _lowercase_):

- visa
- mastercard
- amex
- dinersclub
- discover
- jcb
- unionpay
- maestro
- elo
- hipercard

## Public APIs

List with all public api exposed to use or extends:

| API                    | Type                      | Description                                                                            |
| ---------------------- | ------------------------- | -------------------------------------------------------------------------------------- |
| PaymentInputsModule    | Module                    | Module for Payment Inputs Directives and services                                      |
| jstCardNumber          | Directive                 | Formatter for card. number                                                             |
| jstCardExpireDate      | Directive                 | Formatter for card expiry date .                                                       |
| jstCardCvv             | Directive                 | Formatter for card cvc.                                                                |
| CardTypeService        | Service                   | Service with all card input refs and card type.                                        |
| CardTypesModel         | Interface/Type definition | Type definition for Card Type list (internal list used for identify a card by number). |
| PaymentInputValidators | Class                     | Class with validators for: Card number, card expiry date and card CVC.                 |

## Contributing

Fork the project and help us to improve the project.

Install dependencies with NPM: `npm i`. The project are into _packages_ folder.

To build the project, run `npm run build:payment-inputs`, the artifact goes to `dist/packages` folder.

### Running unit tests

> WIP 🚧

Run `nx test payment-inputs` to execute the unit tests.

## License

MIT @ Rai Siqueira
