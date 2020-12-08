import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { CardTypeService } from '../services/card-type.service';
import utils, { TIMEOUT_SECONDS } from '../utils';

@Directive({
  selector: 'input[jstCardExpireDate][formControlName],input[formControl][jstCardExpireDate]',
  host: {
    '(blur)': 'onTouched()',
  },
})
export class CardExpireDateDirective implements ControlValueAccessor, OnInit, OnDestroy {
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
    this._cardTypeService.setCardExpireRef(this._elementRef);
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
   * Listener the keydown to check when backspace is pressed
   * @param event {KeyboardEvent} - The keyboard event
   */
  @HostListener('keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    const value = (event?.target as HTMLInputElement)?.value;
    if (event.key.toLowerCase() === utils.BACKSPACE_KEY_CODE && !utils.isValue(value)) {
      // focus into card number field case expiry date has empty
      this._cardTypeService?.cardNumberRef?.nativeElement?.focus();
    }
  }

  /**
   * Writes a new value to the element.
   * @param rawValue - value from input
   */
  writeValue(rawValue: KeyboardEvent): void {
    const expireValue = utils.formatters.formatExpiry(rawValue);

    this._rendererTimeout = window?.setTimeout(() => {
      this._ngControl.viewToModelUpdate(expireValue);
      this._ngControl.valueAccessor.writeValue(expireValue);
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
  }

  /**
   * setup input with some attrs for better user experience
   */
  private _setupInput(): void {
    this._renderer.setProperty(this._el, 'autoComplete', 'cc-exp');
    this._renderer.setProperty(this._el, 'aria-label', 'Expiry date in format MM YY');
    this._renderer.setProperty(this._el, 'id', 'ccExpireDate');
    this._renderer.setProperty(this._el, 'name', 'ccExpireDate');
    this._renderer.setProperty(this._el, 'type', 'tel');
  }
}
