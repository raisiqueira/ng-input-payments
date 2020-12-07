/**
 * Model to build a card type list
 */
export interface CardTypesModel {
  displayName: string;
  type: string;
  format: RegExp;
  startPattern: RegExp;
  gaps: number[];
  lengths: number[];
  code: Record<string, any>;
}