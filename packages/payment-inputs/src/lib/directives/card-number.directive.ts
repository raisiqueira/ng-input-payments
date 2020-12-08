import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import clearSpaces from '../utils/clear-spaces';
import utils, { TIMEOUT_SECONDS } from '../utils';
import { CardTypeService } from '../services/card-type.service';

/**
 * Directive to format and validate a card number input type
 */
@Directive({
  selector: 'input[jstCardNumber][formControlName],input[formControl][jstCardNumber]',
  host: {
    '(blur)': 'onTouched()',
  },
})
export class CardNumberDirective implements ControlValueAccessor, OnInit, OnDestroy {
  onChange?: (event: any) => void = () => {};
  onTouched?: (event: any) => void = () => {};

  private _rendererTimeout;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef<HTMLInputElement>,
    private _ngControl: NgControl,
    private _cardTypeService: CardTypeService,
  ) {}

  ngOnInit() {
    this._setupInput();
    this._cardTypeService.setCardNumberRef(this._elementRef);
  }

  ngOnDestroy() {
    if (this._rendererTimeout) {
      window?.clearTimeout(this._rendererTimeout);
    }
  }

  /**
   * get the current html input from element ref
   * @returns The native element from ref
   * @private
   */
  get _el(): HTMLInputElement {
    return this._elementRef.nativeElement;
  }

  /**
   * get the control of the current element ref
   * @returns return the control of element
   * @private
   */
  get _control(): AbstractControl {
    return this._ngControl.control;
  }

  /**
   * listener the input event from html input element
   * @param event - the keyboard event
   */
  @HostListener('input', ['$event'])
  onCardChanges(event: KeyboardEvent) {
    this.writeValue(event);
  }

  /**
   * listener the input blur event to update input mask
   * @param event - the keyboard event
   */
  @HostListener('blur', ['$event'])
  onCardBlur(event: KeyboardEvent) {
    this.writeValue(event);
  }

  /**
   * Writes a new value to the element.
   * @param rawValue - value from input
   */
  writeValue(rawValue: KeyboardEvent): void {
    const cardNumber = (rawValue?.target as HTMLInputElement)?.value || '';
    const cardNumberFormatted = clearSpaces(cardNumber);
    const cardValue = utils.formatters.formatCardNumber(cardNumberFormatted);
    const cardType = utils.cardTypes.getCardTypeByValue(cardNumberFormatted);
    const cardNumberError = utils.validators.getCardNumberError(cardValue, null);

    // update card type value
    this._cardTypeService.setCardType(cardType);

    // check errors
    if (!cardNumberError) {
      this._checkCardNumberMaxLength(rawValue);
      this._control.setValidators(null);
    }

    // update ng control value
    this._rendererTimeout = window?.setTimeout(() => {
      this._ngControl.viewToModelUpdate(cardValue);
      this._ngControl.valueAccessor.writeValue(cardValue);
    }, TIMEOUT_SECONDS);
  }

  /**
   * Registers a callback function that is called when the control's value changes in the UI.
   * @param onChange - {fn}
   */
  registerOnChange(onChange: any): void {
    this.onChange = onChange;
  }

  /**
   * Registers a callback function that is called by the forms API on initialization to update the form model on blur.
   * @param onTouched - {fn}
   */
  registerOnTouched(onTouched: any): void {
    this.onTouched = onTouched;
  }

  /**
   * set element ref as disabled
   * @param isDisabled - set element as disabled
   */
  setDisabledState?(isDisabled: boolean): void {
    this._renderer.setProperty(this._el, 'disabled', isDisabled);
    this._control.disable({ onlySelf: true });
    this._ngControl.valueAccessor.setDisabledState(isDisabled);
  }

  /**
   * Check if card number has reached max value and focus into expire date field
   * @param event {KeyboardEvent} - Keyboard event from the card number input
   */
  private _checkCardNumberMaxLength(event: KeyboardEvent) {
    const cardNumber = (event?.target as HTMLInputElement)?.value || '';
    const cardNumberFormatted = clearSpaces(cardNumber);
    const hasReachedMaxLength = utils.validators.hasCardNumberReachedMaxLength(cardNumberFormatted);
    if (hasReachedMaxLength) {
      event.preventDefault();
      this._cardTypeService.cardExpiryRef?.nativeElement?.focus();
    }
  }

  /**
   * setup input with some attrs for better user experience
   */
  private _setupInput(): void {
    this._renderer.setProperty(this._el, 'autoComplete', 'cc-number');
    this._renderer.setProperty(this._el, 'aria-label', 'Card Number');
    this._renderer.setProperty(this._el, 'id', 'ccCardNumber');
    this._renderer.setProperty(this._el, 'name', 'ccCardNumber');
    this._renderer.setProperty(this._el, 'type', 'tel');
  }
}
