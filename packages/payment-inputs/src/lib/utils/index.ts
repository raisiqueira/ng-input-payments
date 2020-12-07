import * as cardTypes from './card-types';
import * as formatters from './formatters';
import * as validators from './validators';
import { BACKSPACE, ENTER } from '@angular/cdk/keycodes';

// kEYCODES FOR BACKSPACE KEY
export const BACKSPACE_KEY_CODE = 'backspace';
export const BACKSPACE_KEY_NUMBER = BACKSPACE;

// kEYCODES FOR ENTER KEY
export const ENTER_KEY_CODE = 'enter';
export const ENTER_KEY_NUMBER = ENTER;

/**
 * Timeout seconds to update element value
 * @internal
 */
export const TIMEOUT_SECONDS = 0;

export default {
  cardTypes,
  formatters,
  validators,
  BACKSPACE_KEY_CODE,
  BACKSPACE_KEY_NUMBER,
  ENTER_KEY_CODE,
  ENTER_KEY_NUMBER,
}