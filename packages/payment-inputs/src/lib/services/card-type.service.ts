import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardTypesModel } from '../models/card-types.model';

@Injectable()
export class CardTypeService {
  private _cardType$ = new BehaviorSubject<CardTypesModel>(undefined);

  private _cardNumberRef: ElementRef;
  private _cardExpireRef: ElementRef;
  private _cardCVVRef: ElementRef;

  constructor() { }

  get cardType(): Observable<CardTypesModel> {
    return this._cardType$.asObservable();
  }

  get cardNumberRef(): ElementRef {
    return this._cardNumberRef;
  }

  get cardExpireRef(): ElementRef {
    return this._cardExpireRef;
  }

  get cardCVVRef(): ElementRef {
    return this._cardCVVRef;
  }

  /**
   * Update card type object with card type from card input field.
   * @param type - card type object
   */
  setCardType(type: CardTypesModel): void {
    this._cardType$.next(type);
  }

  /**
   * update value of element ref for the Card Number
   * @param el - ElementRef of the Card Number
   */
  setCardNumberRef(el: ElementRef): void {
    this._cardNumberRef = el;
  }

  /**
   * update value of element ref for the Date Expire Input
   * @param el - ElementRef of the Card Expire
   */
  setCardExpireRef(el: ElementRef): void {
    this._cardExpireRef = el;
  }

  /**
   * update value of element ref for the CVV Input
   * @param el - ElementRef of the Card CVV
   */
  setCardCVVRef(el: ElementRef): void {
    this._cardCVVRef = el;
  }
}
