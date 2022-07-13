import is from './is';
import random from './random';

const shuffle = <T extends unknown>(
  value: Array<T> | string,
  toShuffle = 14
): Array<T> | string => {
  if (is('array', value) || is('string', value)) {
    const array = is('array', value) ? (value as Array<T>) : (value as string).split('');

    for (let i = 1; i < toShuffle; i++) {
      const indexA = random(0, array.length - 1);
      const indexB = random(0, array.length - 1);

      const valueA = array[indexA];
      const valueB = array[indexB];

      array[indexA] = valueB;
      array[indexB] = valueA;
    }

    return is('array', value) ? value : array.join('');
  }
};

export default shuffle;
