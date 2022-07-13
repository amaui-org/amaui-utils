import is from './is';
import unique from './unique';
import copy from './copy';

export type TCombination = Array<any> | (() => IterableIterator<any>);

export interface ICombinationOptions {
  items?: number;
  response?: 'array' | 'yield';
}

const optionsDefault: ICombinationOptions = {
  response: 'array',
};

// m - array, n - items
// (m + n - 1)! / n!(m - 1)!
export default function combinationWithRepetition(
  value_: any[],
  items_ = 0,
  options_: ICombinationOptions = {}
): TCombination {
  const options = { ...optionsDefault, ...options_ };

  if (is('array', value_)) {
    const value = unique(value_);

    const items = is('number', items_) ? items_ : 0;
    const length = value.length;

    if (items < 1) return [value];
    if (items === 1) return value.map(item_ => [item_]);

    const response = [];

    let item = new Array(items).fill(0);

    let index = items - 2;
    const max = length - 1;

    let updated = false;

    if (options.response === 'array') {
      while (index >= 0) {
        if (updated) {
          index = items - 2;
          updated = false;
        }

        while (item[item.length - 1] < length) {
          const item_ = item.slice().map(index_ => value[index_]);

          response.push(item_);

          item[item.length - 1]++;
        }

        // Increment index if it item index is less than max
        // else move on to previous one, etc.

        // and all following keys up to items length should be +1 index
        while (true) {
          if (item[index] === max) {
            index--;

            if (index < 0) break;

            updated = true;
          }
          else {
            // Increment item index
            item[index]++;

            // and make all following items up to items length previous + 1
            const part = item.slice(0, index + 1);

            item = [...part, ...Array(items - part.length).fill(item[index])];

            break;
          }
        }
      }

      return response;
    }

    if (options.response === 'yield') return function* () {
      while (index >= 0) {
        if (updated) {
          index = items - 2;
          updated = false;
        }

        while (item[item.length - 1] < length) {
          const item_ = item.slice().map(index_ => value[index_]);

          yield item_;

          response.push(item_);

          item[item.length - 1]++;
        }

        // Increment index or if it's index is less than max + index of one next to it
        // move on to previous one, etc.

        // And all following keys up to items length should be +1 index
        while (true) {
          if (item[index] === max) {
            index--;

            if (index < 0) break;

            updated = true;
          }
          else {
            // Increment item index
            item[index]++;

            // and make all following items up to items length previous + 1
            const part = item.slice(0, index + 1);

            item = [...part, ...Array(items - part.length).fill(item[index])];

            break;
          }
        }
      }

      return response;
    };
  }
}
