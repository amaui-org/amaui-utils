import is from './is';
import unique from './unique';
import permutation from './permutation';
import variationWithRepetition from './variationWithRepetition';

export type TVariation = Array<any> | (() => IterableIterator<any>);

export interface IVariationOptions {
  response?: 'array' | 'yield';
}

const optionsDefault: IVariationOptions = {
  response: 'array',
};

// m - array, n - items
// m! / (m - n)!
export default function variation(
  value_: any[],
  items_ = 0,
  options_: IVariationOptions = {}
): TVariation {
  const options = { ...optionsDefault, ...options_ };

  if (is('array', value_)) {
    const value = unique(value_);

    const items = is('number', items_) ? items_ : 0;
    const length = value.length;

    if (items < 1) return [value];
    if (items === 1) return value.map(item_ => [item_]);

    // If items is same is length it's a permutation method
    if (length === items) return permutation(value, options);

    // If items is more than length it's a variationWithRepetition method
    if (items > length) return variationWithRepetition(value, items, options);

    // And other use case, we have less items than the amount of values
    // [0, 1, 2, 3, 4], or whatever
    const allIndexes = [...Array(length).keys()];
    let item = [...Array(items).keys()];

    let index = items - 2;
    let availableIndexes = allIndexes.filter(i_ => item.slice(0, -1).indexOf(i_) === -1);
    const availableIndexesLength = availableIndexes.length;

    let updated = false;

    const response = [];

    if (options.response === 'array') {
      first:
      while (index >= 0) {
        if (updated) {
          index = items - 2;
          updated = false;
        }

        // Update available indexes
        availableIndexes = allIndexes.filter(i_ => item.slice(0, -1).indexOf(i_) === -1);

        // Add all the values from available indexes to the last index
        for (let l = 0; l < availableIndexesLength; l++) {
          item[item.length - 1] = availableIndexes[l];

          const item_ = item.slice().map(index_ => value[index_]);

          response.push(item_);
        }

        // Move to the left of the values
        while (true) {
          if (item[index] === length - 1) {
            index--;

            if (index < 0) break;

            updated = true;
          }
          else {
            // Make this value a next one in available based on it's current and all values from the left
            item[index] = allIndexes.filter(i_ => item.slice(0, index + 1).indexOf(i_) === -1 && i_ > item[index])[0];

            if (item[index] === undefined) {
              index--;

              if (index < 0) break;

              updated = true;
            }
            else {
              // Make rest of item values unique based on all the left values
              const part = item.slice(0, index + 1);

              item = [...part, ...allIndexes.filter(i_ => part.indexOf(i_) === -1).slice(0, items - part.length)];

              if (item[1] === undefined || item[index] === undefined) break first;

              break;
            }
          }
        }

        if (item[0] === length && item[1] === length - 1) break;
      }

      return response;
    }

    if (options.response === 'yield') return function* () {
      first:
      while (index >= 0) {
        if (updated) {
          index = items - 2;
          updated = false;
        }

        // Update available indexes
        availableIndexes = allIndexes.filter(i_ => item.slice(0, -1).indexOf(i_) === -1);

        // Add all the values from available indexes to the last index
        for (let l = 0; l < availableIndexesLength; l++) {
          item[item.length - 1] = availableIndexes[l];

          const item_ = item.slice().map(index_ => value[index_]);

          yield item_;

          response.push(item_);
        }

        // Move to the left of the values
        while (true) {
          if (item[index] === length - 1) {
            index--;

            if (index < 0) break;

            updated = true;
          }
          else {
            // Make this value a next one in available based on it's current and all values from the left
            item[index] = allIndexes.filter(i_ => item.slice(0, index + 1).indexOf(i_) === -1 && i_ > item[index])[0];

            if (item[index] === undefined) {
              index--;

              if (index < 0) break;

              updated = true;
            }
            else {
              // Make rest of item values unique based on all the left values
              const part = item.slice(0, index + 1);

              item = [...part, ...allIndexes.filter(i_ => part.indexOf(i_) === -1).slice(0, items - part.length)];

              if (item[1] === undefined || item[index] === undefined) break first;

              break;
            }
          }
        }

        if (item[0] === length && item[1] === length - 1) break;
      }

      return response;
    };
  }
}
