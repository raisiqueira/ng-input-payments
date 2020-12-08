import { AbstractControl, ValidatorFn } from '@angular/forms';
import utils from '../utils';

/**
 * Class with validators to use with Payment Input directives and reactive forms.
 * All class methods are static.
 *
 * @example
 * Example with a form group:
 * ```ts
 *   ngOnInit(): void {
 *    this.form = this.fb.group({
 *      cardNumber: [null, [PaymentInputValidators.validateCardNumber()]],
 *      cardCvc: [null, [PaymentInputValidators.validateCardExpiryDate()]],
 *      cardValidate: [null, [PaymentInputValidators.validateCVC()]],
 *    });
 *  }
 * ```
 */
export class PaymentInputValidators {
  /**
   * Validate a card number
   * @returns Angular validator function
   * @static
   */
  static cardNumber(): ValidatorFn {
    return (control: AbstractControl): { [KEY: string]: any } | null => {
      const value = control?.value;
      const cardNumberError = utils.validators.getCardNumberError(value, null);
      return !cardNumberError ? null : { 'card-number': cardNumberError };
    };
  }

  /**
   * Validate a card expiry date
   * @returns Angular validator function
   * @static
   */
  static expiryDate(): ValidatorFn {
    return (control: AbstractControl): { [KEY: string]: any } | null => {
      const value = control?.value;
      const cardNumberError = utils.validators.getExpiryDateError(value, null);
      return !cardNumberError ? null : { 'card-expiry': cardNumberError };
    };
  }

  /**
   * Validate a card CVC
   * @returns Angular validator function
   * @static
   */
  static CVC(): ValidatorFn {
    return (control: AbstractControl): { [KEY: string]: any } | null => {
      const value = control?.value;
      const cardNumberError = utils.validators.getCVCError(value, null);
      return !cardNumberError ? null : { 'card-cvc': cardNumberError };
    };
  }
}
