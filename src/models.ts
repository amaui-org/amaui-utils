export type TMethod = (...args: any[]) => any;

export type TFilterOperator = 'less-than' | 'less-than-equal' | 'equal' | 'not-equal' | 'array-all' | 'array-some' | 'starts-with' | 'contains' | 'greater-than-equal' | 'greater-than';

export interface IFilter {
  field: string;
  operator: TFilterOperator;
  value: any;
}
