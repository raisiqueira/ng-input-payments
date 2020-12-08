/**
 * @description returns a value without spaces
 * @param value {string} - any string
 */
export default function (value: string): string {
  if (!value) {
    return;
  }

  return String(value).replace(/\s/g, '');
}
