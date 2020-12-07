/**
 * @description returns a value without spaces
 * @param value {string}
 */
export default function (value: string): string {
  if (!value) {
    return;
  }

  return value.replace(/\s/g, '');
}