import { Directive, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NgControl } from '@angular/forms';
import { CardTypeService } from '../services/card-type.service';

@Directive({
  selector: 'input[formControlName][jstCardCvv],input[formControl][jstCardCvv]'
})
export class CardCvvDirective implements ControlValueAccessor, OnInit, OnDestroy {

  onChange?: (event: any) => void = () => {};
  onTouched?: (event: any) => void = () => {};

  private _rendererTimeout;

  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef<HTMLInputElement>,
    private _ngControl: NgControl,
    private _cardTypeService: CardTypeService,
    ) { }

  ngOnInit() {
    this._cardTypeService.setCardCVVRef(this._elementRef);
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
  writeValue(rawValue: any): void {
    throw new Error('Method not implemented.');
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
}
