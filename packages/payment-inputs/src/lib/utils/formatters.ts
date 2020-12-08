import * as cardTypes from './card-types';

/**
 * @description format card number based on card type list per card BIN
 * @param cardNumber {string} - card number form html input
 */
export const formatCardNumber = (cardNumber: string): string => {
  const cardType = cardTypes.getCardTypeByValue(cardNumber);

  if (!cardType) return (cardNumber?.match(/\d+/g) || [])?.join('');

  const format = cardType?.format;
  if (format?.global) {
    return (cardNumber?.match(format) || [])?.join(' ');
  }

  if (format) {
    const execResult = format.exec(cardNumber.split(' ').join(''));
    if (execResult) {
      return execResult
        .splice(1, 3)
        .filter((x) => x)
        .join(' ');
    }
  }

  return cardNumber;
};

/**
 * @description Format expiry date based on card BIN
 * @param event {unknown} - Event from card date expiry date
 * @returns string
 */
export const formatExpiry = (event: any): string => {
  const eventData = event?.nativeEvent?.data;
  const prevExpiry = (event?.target as HTMLInputElement)?.value?.split(' / ')?.join('/');

  if (!prevExpiry) return null;
  let expiry = prevExpiry;
  if (/^[2-9]$/.test(expiry)) {
    expiry = `0${expiry}`;
  }

  if (prevExpiry.length === 2 && +prevExpiry > 12) {
    const [head, ...tail] = prevExpiry.split('');
    expiry = `0${head}/${tail.join('')}`;
  }

  if (/^1[/-]$/.test(expiry)) {
    return `01 / `;
  }

  expiry = expiry.match(/(\d{1,2})/g) || ([] as any);
  if (expiry?.length === 1) {
    if (!eventData && prevExpiry.includes('/')) {
      return expiry[0] as string;
    }
    if (/\d{2}/.test(expiry)) {
      return `${expiry[0]} / `;
    }
  }
  if (expiry?.length > 2) {
    const [, month = null, year = null] =
      (expiry as any).join('').match(/^(\d{2}).*(\d{2})$/) || [];
    return [month, year].join(' / ');
  }
  return (expiry as any).join(' / ');
};
