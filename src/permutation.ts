import { is } from './is';
import merge from './merge';
import unique from './unique';
import equalDeep from './equalDeep';

export type TPermutation = Array<any> | (() => IterableIterator<any>);

export interface IPermutationOptions {
  items?: number;
  response?: 'array' | 'yield';
}

const optionsDefault: IPermutationOptions = {
  response: 'array',
};

// m - array
// m!
export function permutation(value_: any[], options_: IPermutationOptions = {}): TPermutation {
  const options = merge(options_, optionsDefault, { copy: true });

  if (is('array', value_)) {
    const value = unique(value_);

    const length = value.length;
    const items = length;

    if (items < 1) return [value];
    if (items === 1) return value.map(item_ => [item_]);
    if (items === 2) return [value, [value[1], value[0]]];

    // And other use case, we have less items than the amount of values
    // [0, 1, 2, 3, 4], or whatever
    const allIndexes = [...Array(length).keys()];
    let item = [...Array(items).keys()];

    let index = items - 3;

    let updated = false;

    const response = [];

    if (options.response === 'array') {
      while (index >= 0) {
        if (updated) {
          index = items - 3;
          updated = false;
        }

        // Add item to response
        response.push(item.slice().map(index_ => value[index_]));

        // Swap last two and add item to response
        [item[length - 2], item[length - 1]] = [item[length - 1], item[length - 2]];

        response.push(item.slice().map(index_ => value[index_]));

        if (item[0] === length - 1 && item[1] === length - 2 && equalDeep(item, value.slice().reverse())) break;

        // Move to the left of the values
        while (true) {
          const firstPart = item.slice(0, index + 1);
          const indexNew = allIndexes.filter(index_ => index_ > item[index] && firstPart.indexOf(index_) === -1)[0];

          if (!indexNew) {
            index--;

            if (index < 0) break;

            updated = true;
          }
          else {
            // Increment the index
            // Make rest of the items unique based on the left over indexes from allIndexes
            item[index] = indexNew;

            // Make rest of item values unique based on all the left values
            const part = item.slice(0, index + 1);

            item = [...part, ...allIndexes.filter(i_ => part.indexOf(i_) === -1).slice(0, items - part.length)];

            break;
          }
        }
      }

      return response;
    }

    if (options.response === 'yield') return function* () {
      while (index >= 0) {
        if (updated) {
          index = items - 3;
          updated = false;
        }

        // Add item to response
        let item_ = item.slice().map(index_ => value[index_]);

        yield item_;

        response.push(item_);

        // Swap last two and add item to response
        [item[length - 2], item[length - 1]] = [item[length - 1], item[length - 2]];

        item_ = item.slice().map(index_ => value[index_]);

        yield item_;

        response.push(item_);

        if (item[0] === length - 1 && item[1] === length - 2 && equalDeep(item, value.slice().reverse())) break;

        // Move to the left of the values
        while (true) {
          const firstPart = item.slice(0, index + 1);
          const indexNew = allIndexes.filter(index_ => index_ > item[index] && firstPart.indexOf(index_) === -1)[0];

          if (!indexNew) {
            index--;

            if (index < 0) break;

            updated = true;
          }
          else {
            // Increment the index
            // Make rest of the items unique based on the left over indexes from allIndexes
            item[index] = indexNew;

            // Make rest of item values unique based on all the left values
            const part = item.slice(0, index + 1);

            item = [...part, ...allIndexes.filter(i_ => part.indexOf(i_) === -1).slice(0, items - part.length)];

            break;
          }
        }
      }

      return response;
    };
  }
}

// m - array
// m! / a! * b! * c! ...
export function permutationWithRepetition(value_: any[], options_: IPermutationOptions = {}): TPermutation {
  const options = merge(options_, optionsDefault, { copy: true });

  if (is('array', value_)) {
    const value = unique(value_);

    const length = value.length;
    const items = is('number', options.items) ? options.items : length;

    if (items < 1) return [value];
    if (items === 1) return value.map(item_ => [item_]);

    const item = new Array(items).fill(0);
    let index = items - 2;

    const response = [];

    // Starts with all 0 indexes for all items
    // it loops for the last position and makes each item for each index
    // then, it moves to the left and increments the index by 1
    // once item on left index increment moves over amount of items
    // it resets to 0 index, and then it moves left and increments that item
    // using same methodology, etc. until item at index 0 has index value === items.length
    if (options.response === 'array') {
      while (index >= 0) {
        // Reset
        index = items - 2;

        for (let i = 0; i < length; i++) {
          item[items - 1] = i;

          response.push(item.map(index_ => value[index_]));
        }

        // Move to the left of the values
        while (true) {
          if (item[index] === length - 1) {
            item[index] = 0;

            index--;

            if (index < 0) break;
          }
          else {
            item[index]++;

            break;
          }
        }
      }

      return response;
    }

    if (options.response === 'yield') return function* () {
      while (index >= 0) {
        // Reset
        index = items - 2;

        for (let i = 0; i < length; i++) {
          item[items - 1] = i;

          const item_ = item.map(index_ => value[index_]);

          yield item_;

          response.push(item_);
        }

        // Move to the left of the values
        while (true) {
          if (item[index] === length - 1) {
            item[index] = 0;

            index--;

            if (index < 0) break;
          }
          else {
            item[index]++;

            break;
          }
        }
      }

      return response;
    };
  }
}
