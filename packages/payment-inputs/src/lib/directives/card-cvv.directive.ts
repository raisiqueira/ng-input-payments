import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
  Optional,
  Renderer2,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { CardTypeService } from '../services/card-type.service';
import utils, { TIMEOUT_SECONDS } from '../utils';
import clearSpaces from '../utils/clear-spaces';

/**
 * Directive to format and validate a card CVC
 */
@Directive({
  selector: 'input[formControlName][jstCardCvv],input[formControl][jstCardCvv]',
  host: {
    '(blur)': 'onTouched()',
  },
})
export class CardCvvDirective implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  onChange?: (event: any) => void = () => {};
  onTouched?: (event: any) => void = () => {};

  private _rendererTimeout;

  private _cvvMaskLength: number;

  /**
   * attr for stop all subscribes
   */
  private readonly _destroy$ = new Subject<void>();

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef<HTMLInputElement>,
    @Optional() private _ngControl: NgControl,
    private _cardTypeService: CardTypeService,
  ) {}

  ngOnInit() {
    this._setupInput();
    this._cardTypeService.setCardCVVRef(this._elementRef);
  }

  ngAfterViewInit() {
    this._setCardCvcMask();
  }

  ngOnDestroy() {
    this._destroy$.next();
    this._destroy$.complete();
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
      // focus into card number field case expiry date is empty
      this._cardTypeService?.cardExpiryRef?.nativeElement?.focus();
    }
  }

  /**
   * Writes a new value to the element.
   * @param rawValue - value from input
   */
  writeValue(rawValue: KeyboardEvent): void {
    const cvcValue = (rawValue.target as HTMLInputElement)?.value || '';
    const cvcValueFormatted = clearSpaces(cvcValue);
    const reg = new RegExp(`([0-9]{${this._cvvMaskLength}})`, 'g');
    const cvcmask = cvcValueFormatted?.replace(reg, '$1');
    this._rendererTimeout = window?.setTimeout(() => {
      this._ngControl.viewToModelUpdate(cvcmask);
      this._ngControl.valueAccessor.writeValue(cvcmask);
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
   * Set the mask size based on card type (from card BIN)
   */
  private _setCardCvcMask(): void {
    this._cardTypeService.cardType
      .pipe(
        takeUntil(this._destroy$),
        map((type) => {
          this._cvvMaskLength = type?.code?.length;
          return type;
        }),
      )
      .subscribe();
  }

  /**
   * setup input with some attrs for better user experience
   */
  private _setupInput(): void {
    this._renderer.setProperty(this._el, 'autoComplete', 'cc-csc');
    this._renderer.setProperty(this._el, 'aria-label', 'Card CVC');
    this._renderer.setProperty(this._el, 'id', 'cccvc');
    this._renderer.setProperty(this._el, 'name', 'cccvc');
    this._renderer.setProperty(this._el, 'type', 'tel');
  }
}
