
export interface IOptions {
  variant?: string;
  min?: number;
  max?: number;
  valueA?: any;
  valueB?: any;
  operator?: 'less-than' | 'less-than-equal' | 'equal' | 'not-equal' | 'array-all' | 'array-some' | 'starts-with' | 'contains' | 'greater-than-equal' | 'greater-than';
}

const optionsDefault: IOptions = {};

const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
const isNodejs = !!(typeof global !== 'undefined' && typeof module !== 'undefined' && module.exports);

// Multiple is methods instead of one,
// so it's lighter for tree shaking usability reasons
export default function is(
  type: string,
  value?: any,
  options_: IOptions = {}
) {
  const options = { ...optionsDefault, ...options_ };

  const { variant } = options;

  const prototype = value && typeof value === 'object' && Object.getPrototypeOf(value);

  switch (type) {
    case 'string':
      return typeof value === 'string';

    case 'number':
      return typeof value === 'number' && !Number.isNaN(value);

    case 'boolean':
      return typeof value === 'boolean';

    case 'array':
      return Array.isArray(value);

    case 'object':
      const isObject = typeof value === 'object' && !!value && value.constructor === Object;

      return isObject;

    // Map, null, WeakMap, Date, etc.
    case 'object-like':
      return typeof value === 'object' && (value === null || value.constructor !== Object);

    case 'class':
      return (
        (typeof value === 'object' || typeof value === 'function') &&
        (/class/gi.test(String(value)) || /class/gi.test(String(value?.constructor)))
      );

    case 'function':
      return !!(value && value instanceof Function);

    case 'async':
      // If it's browser avoid calling the method
      // to see if it's async func or not,
      // where as in nodejs we have no other choice
      // that i know of when using transpilation
      // And also it might not be always correct, as
      // a method that returns a promise is also async
      // but we can't know that until the method is called and
      // we inspect the method's return value
      return !!(is('function', value) && (isBrowser ? value.constructor.name === 'AsyncFunction' : value() instanceof Promise));

    case 'map':
      return !!(prototype === Map.prototype);

    case 'weakmap':
      return !!(prototype === WeakMap.prototype);

    case 'set':
      return !!(prototype === Set.prototype);

    case 'weakset':
      return !!(prototype === WeakSet.prototype);

    case 'promise':
      return !!(prototype === Promise.prototype);

    case 'int8array':
      return !!(prototype === Int8Array.prototype);

    case 'uint8array':
      return !!(prototype === Uint8Array.prototype);

    case 'uint8clampedarray':
      return !!(prototype === Uint8ClampedArray.prototype);

    case 'int16array':
      return !!(prototype === Int16Array.prototype);

    case 'uint16array':
      return !!(prototype === Uint16Array.prototype);

    case 'int32array':
      return !!(prototype === Int32Array.prototype);

    case 'uint32array':
      return !!(prototype === Uint32Array.prototype);

    case 'float32array':
      return !!(prototype === Float32Array.prototype);

    case 'float64array':
      return !!(prototype === Float64Array.prototype);

    case 'bigint64array':
      return !!(prototype === BigInt64Array.prototype);

    case 'biguint64array':
      return !!(prototype === BigUint64Array.prototype);

    case 'typedarray':
      return is('int8array', value) || is('uint8array', value) || is('uint8clampedarray', value) || is('int16array', value) || is('uint16array', value) || is('int32array', value) || is('uint32array', value) || is('float32array', value) || is('float64array', value) || is('bigint64array', value) || is('biguint64array', value);

    case 'dataview':
      return !!(prototype === DataView.prototype);

    case 'arraybuffer':
      return !!(prototype === ArrayBuffer.prototype);

    case 'sharedarraybuffer':
      return typeof SharedArrayBuffer !== 'undefined' && !!(prototype === SharedArrayBuffer.prototype);

    case 'symbol':
      return !!(typeof value === 'symbol');

    case 'error':
      return !!(value && value instanceof Error);

    case 'date':
      return !!(value && value instanceof Date);

    case 'regexp':
      return !!(value && value instanceof RegExp);

    case 'arguments':
      return !!(value && value.toString() === '[object Arguments]');

    case 'null':
      return value === null;

    case 'undefined':
      return value === undefined;

    case 'blob':
      return isBrowser && value instanceof Blob;

    case 'buffer':
      return !!(isNodejs && typeof value?.constructor?.isBuffer === 'function' && value.constructor.isBuffer(value));

    case 'element':
      if (value) {
        switch (variant) {
          case undefined:
          case 'html':
          case 'element':
            return isBrowser && (
              typeof HTMLElement === 'object' ?
                value instanceof HTMLElement :
                value && typeof value === 'object' && value !== null && value.nodeType === 1 && typeof value.nodeName === 'string'
            );

          case 'node':
            return isBrowser && (
              typeof Node === 'object' ?
                value instanceof Node :
                value && typeof value === 'object' && value !== null && typeof value.nodeType === 'number' && typeof value.nodeName === 'string'
            );

          case 'react':
            return value.elementType || value.hasOwnProperty('$$typeof');

          default:
            return false;
        }
      }

      return false;

    case 'simple':
      return (
        is('string', value, options) ||
        is('number', value, options) ||
        is('boolean', value, options) ||
        is('undefined', value, options) ||
        is('null', value, options)
      );

    case 'not-array-object':
      return !is('array', value, options) && !is('object', value, options);

    default:
      return false;
  }
}
