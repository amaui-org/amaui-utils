import permutationWithRepetition from './permutationWithRepetition';

export type TVariation = Array<any> | (() => IterableIterator<any>);

export interface IVariationOptions {
  response?: 'array' | 'yield';
}

const optionsDefault: IVariationOptions = {
  response: 'array',
};

// m - array, n - items
// m ** n
export default function variationWithRepetition(
  value_: any[],
  items = 0,
  options_: IVariationOptions = {}
): TVariation {
  const options = { ...optionsDefault, ...options_ };

  return permutationWithRepetition(value_, { ...options, items });
}
