import is from './is';
import getObjectValue from './getObjectValue';

/**
 * It returns an array with unique simple values
 * and / or array and object values.
 *
 * Referenced values are only compared based on
 * values in those reference type values based on array
 * of keys provided in the second argument in the method.
 *
 * Uniqueness of array and object values is separatelly
 * evaluated based on keys value and returned in the result.
 */
const unique = <T extends unknown>(
  object: T,
  ...args: string[]
): any[] => {
  const cache = {
    simple: [],
    array: [],
    object: [],
  };
  const output = [];

  if (is('array', object)) {
    (object as any[]).forEach(item => {
      const isNotArrayObject = is('not-array-object', item);
      const isArray = is('array', item);
      const value = (isNotArrayObject || !args.length) ? item : getObjectValue(item, ...args);

      const cacheArray = cache[isNotArrayObject ? 'simple' : isArray ? 'array' : 'object'];
      const exists = cacheArray.find(cacheItem => value === cacheItem);

      if (!exists && value !== undefined) {
        output.push(item);

        cache[isNotArrayObject ? 'simple' : isArray ? 'array' : 'object'].push(value);
      }
    });
  }

  return output;
};

export default unique;
