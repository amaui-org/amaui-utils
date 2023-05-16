import is from './is';
import unique from './unique';

export type TPermutation = Array<any> | (() => IterableIterator<any>);

export interface IPermutationOptions {
  items?: number;
  response?: 'array' | 'yield';
}

const optionsDefault: IPermutationOptions = {
  response: 'array',
};

// m - array
// m! / a! * b! * c! ...
export default function permutationWithRepetition(
  value_: any[],
  options_: IPermutationOptions = {}
): TPermutation {
  const options = { ...optionsDefault, ...options_ };

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
