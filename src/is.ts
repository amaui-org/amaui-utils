import { validate as uuidValidate } from 'uuid';

import equalDeep from './equalDeep';

declare const WorkerGlobalScope: any;

export interface IOptions {
  variant?: string;
  min?: number;
  max?: number;
  valueA?: any;
  valueB?: any;
  operator?: 'less-than' | 'less-than-equal' | 'equal' | 'not-equal' | 'array-all' | 'array-some' | 'starts-with' | 'contains' | 'greater-than-equal' | 'greater-than';
}

const optionsDefault: IOptions = {};

// Multiple is methods instead of one,
// so it's lighter for tree shaking usability reasons
export const is = (
  type: string,
  value: any = undefined,
  options_: IOptions = optionsDefault
) => {
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
      return !!(is('function', value) && (isEnvironment('browser') ? value.constructor.name === 'AsyncFunction' : value() instanceof Promise));

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
      return isEnvironment('browser') && value instanceof Blob;

    case 'buffer':
      return !!(isEnvironment('nodejs') && typeof value?.constructor?.isBuffer === 'function' && value.constructor.isBuffer(value));

    case 'element':
      if (value) {
        switch (variant) {
          case undefined:
          case 'html':
          case 'element':
            return isEnvironment('browser') && (
              typeof HTMLElement === 'object' ?
                value instanceof HTMLElement :
                value && typeof value === 'object' && value !== null && value.nodeType === 1 && typeof value.nodeName === 'string'
            );

          case 'node':
            return isEnvironment('browser') && (
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
};

export const isState = (
  type: string
) => {
  switch (type) {
    case 'online':
      return isEnvironment('browser') && window.navigator.onLine;

    case 'offline':
      return isEnvironment('browser') && !window.navigator.onLine;

    default:
      return false;
  }
};

export const isValid = (
  type: string,
  value: any = undefined,
  options_: IOptions = optionsDefault
) => {
  const options = { ...optionsDefault, ...options_ };

  let valueA: any;
  let valueB: any;
  let operator: any;
  let operators: any;
  let pattern: any;
  let value_: any;

  switch (type) {
    case 'date':
      return isValid('timestamp', new Date(value).getTime());

    case 'uuid':
      return uuidValidate(value);

    case 'binary-string':
      value_ = ['0', '1'];

      return is('string', value) && [...value].every(item => value_.indexOf(item) > -1);

    case 'hexadecimal-string':
      value_ = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f'];

      return is('string', value) && [...value].every(item => value_.indexOf(item) > -1);

    case 'url':
      pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;

      return pattern.test(value);

    case 'url-path':
      pattern = /^\/([^\/][A-Za-z0-9\-._~!$&'()*+,;=:@\/?#%]*)?$/;

      return pattern.test(value);

    case 'compare':
      ({ valueA, valueB, operator } = options);

      operators = {
        'less-than': valueA < valueB,
        'less-than-equal': valueA <= valueB,

        'equal': equalDeep(valueA, valueB),
        'not-equal': !equalDeep(valueA, valueB),

        'greater-than-equal': valueA >= valueB,
        'greater-than': valueA > valueB,

        'array-all': is('array', valueA) && is('array', valueB) && valueA.every((_: any, index: number) => equalDeep(valueA[index], valueB[index])),
        'array-some': is('array', valueA) && is('array', valueB) && valueA.some((_: any, index: number) => equalDeep(valueA[index], valueB[index])),

        'starts-with': is('string', valueA) && valueA.indexOf(valueB) === 0,
        'contains': is('string', valueA) && valueA.indexOf(valueB) > -1,
      };

      return operators[operator];

    case 'semver':
      pattern = /^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;

      return pattern.test(value);

    case 'semver-compare':
      ({ valueA, valueB, operator } = options);

      if (!(isValid('semver', valueA) && isValid('semver', valueB))) return false;

      valueA = (valueA.match(/\d+(\.|\-|\+){0,1}/g) || []).map((item: any) => item.replace(/[,\-\+\.]/g, ''));
      valueB = (valueB.match(/\d+(\.|\-|\+){0,1}/g) || []).map((item: any) => item.replace(/[,\-\+\.]/g, ''));

      operators = {
        'less-than': false,
        'less-than-equal': false,
        'equal': valueA.every((item: any, index: number) => item === valueB[index]),
        'greater-than-equal': false,
        'greater-than': false,
      };

      // Less then
      valueA.forEach((item: any, index: number) => {
        if (!operators['less-than']) operators['less-than'] = item < valueB[index];
      });

      // Greater then
      valueA.forEach((item: any, index: number) => {
        if (!operators['greater-than']) operators['greater-than'] = item > valueB[index];
      });

      // Other or operator values
      operators['less-than-equal'] = operators['less-than'] || operators['equal'];
      operators['greater-than-equal'] = operators['greater-than'] || operators['equal'];

      return operators[operator];

    case 'timestamp':
      return (
        Number.isInteger(value) &&
        String(value).length >= 10 &&
        (
          new Date(value).getTime() > 0 ||
          new Date(value * 1000).getTime() > 0
        )
      );

    case 'mobile':
      pattern = /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

      return pattern.test(value) && !Number.isInteger(value);

    case 'email':
      pattern = /\S+@\S+\.\S+/;

      return pattern.test(value);

    case 'hash':
      pattern = /^(0x)?[a-f0-9]{64}$/gi;

      return is('string', value) && pattern.test(value);

    case 'color-rgb':
      // Matches rgb() and rgba(), with values divided with ',' and spaces (optionaly)
      pattern = /rgb(a)?\((([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))(\.\d+)?,\s*(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))(\.\d+)?,\s*(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5]))(\.\d+)?(,\s*(?:0(?:\.[0-9]{1,2})?|1(?:\.00?)?))?\)/;

      return pattern.test(value);

    case 'color-hex':
      // Matches #nnn, #nnnnnn and #nnnnnnnn (where last nn's are for alpha (optionaly))
      pattern = /^#((?:[0-9a-fA-F]){3}|(?:[0-9a-fA-F]){6}|(?:[0-9a-fA-F]){8})$/;

      return pattern.test(value);

    case 'color-hsl':
      // Matches hsl() and hsla(), with values divided with ',' and spaces (optionaly)
      pattern = /hsl(a)?\((0|[1-9][0-9]?|[12][0-9][0-9]|3[0-5][0-9])(\.\d+)?,\s*([0-9]|[1-9][0-9]|100)(\.\d+)?%,\s*([0-9]|[1-9][0-9]|100)(\.\d+)?%(,\s*(?:0(?:\.[0-9]{1,2})?|1(?:\.00?)?))?\)/;

      return pattern.test(value);

    case 'json':
      try {
        value_ = JSON.parse(value);
      }
      catch (error) { return false; }

      return is('object', value_, options) || is('array', value_, options);

    case 'min':
      return value >= options.min;

    case 'max':
      return value <= options.max;

    case 'min-max':
      return isValid('min', value, options) && isValid('max', value, options);

    case 'same-origin':
      try {
        value_ = new URL(value);
      }
      catch (error) { }

      return isEnvironment('browser') && (isValid('url-path', value, options) || (window.location.hostname === (value_ as URL)?.hostname));

    case 'js-chunk':
      return is('object', value, options) && !!value.__esModule && (value.default instanceof Function || value.default instanceof Object);

    case 'http-method':
      const methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'OPTIONS', 'PATCH'];

      return is('string', value, options) && methods.indexOf(value.toUpperCase()) > -1;

    case 'base64':
      value_ = typeof value === 'string' ? value.trim() : value;

      return is('string', value_, options) && value_.length >= 1 && /^(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?$/gi.test(value_);

    case 'datauri':
      value_ = typeof value === 'string' ? value.trim() : value;

      return (
        is('string', value_, options) &&
        /^data:\w+\/[-+.\w]+;base64,(?:[A-Za-z0-9+\\/]{4})*(?:[A-Za-z0-9+\\/]{2}(==)?|[A-Za-z0-9+\\/]{3}=?)?$/gi.test(value_) ||
        /^data:(\w+\/[-+.\w]+)?(;charset=[\w-]+)?,(.*)?/gi.test(value_)
      );

    default:
      return false;
  }
};

export const isEnvironment = (
  type: string,
  value: any = undefined
) => {
  let value_: any;

  switch (type) {
    case 'browser':
      return typeof window !== 'undefined' && typeof window.document !== 'undefined';

    case 'worker':
      return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

    case 'nodejs':
      return !!(typeof global !== 'undefined' && typeof module !== 'undefined' && module.exports);

    case 'localhost':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window.location.hostname);

      return is('string', value_) && ['localhost', '127.0.0.1'].some(value__ => value_.indexOf(value__) > -1);

    default:
      return false;
  }
};

export const isExists = (
  type: string
) => {
  switch (type) {
    case 'crypto':
      return typeof crypto !== 'undefined';

    case 'Intl':
      return typeof Intl !== 'undefined';

    default:
      return false;
  }
};

export const isOS = (
  type: string,
  value: any = undefined
) => {
  let value_: any;

  switch (type) {
    case 'mac':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Mac)/i.test(value_.navigator.platform) || value_.navigator.userAgent.indexOf('Mac OS') > -1);

    case 'mobile':
      return isOS('android') || isOS('ios');

    case 'android':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Android)/i.test(value_.navigator.platform) || ['Android', 'android'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    case 'ios':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(iPhone|iPod|iPad)/i.test(value_.navigator.platform) || ['iPhone', 'iPod', 'iPad'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    case 'windows':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Win)/i.test(value_.navigator.platform) || value_.navigator.userAgent.indexOf('Win') > -1);

    case 'linux':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Linux|Unix)/i.test(value_.navigator.platform) || ['Linux', 'Unix'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    default:
      return false;
  }
};

export const isBrowser = (
  type: string,
  value: any = undefined
) => {
  let value_: any;

  switch (type) {
    case 'chrome':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (!!(value_['chrome']?.webstore || value_['chrome']?.runtime) || value_.navigator.userAgent.indexOf('Chrome') > -1);

    case 'opera':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (!!value_['opr']?.addons || !!value_['opera'] || value_.navigator.userAgent.indexOf(' OPR') > -1);

    case 'firefox':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (typeof value_['InstallTrigger'] !== 'undefined' || ['Firefox'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    case 'safari':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/^((?!chrome|android).)*safari/i.test(value_.navigator.userAgent) || (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!value_['safari'] || (value_['safari']?.pushNotification)));

    case 'edge-chromium':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (isBrowser('chrome', value) && value_.navigator.userAgent.indexOf('Edg') > -1);

    case 'edge':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (!isBrowser('ie', value) && (value_.navigator.userAgent.indexOf('Edg') > -1));

    case 'ie':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/*@cc_on!@*/false || !!value_.document['documentMode']);

    default:
      return false;
  }
};

export const isResponsive = (
  type: string,
  value: any = undefined
) => {
  let value_: any;

  switch (type) {
    case 'mobile':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (max-width: 767px)').matches;

    case 'tablet':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 768px) and (max-width: 1279px)').matches;

    case 'laptop':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 1280px) and (max-width: 1919px)').matches;

    case 'desktop':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 1920px) and (max-width: 2559px)').matches;

    case 'tv':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 2560px)').matches;

    default:
      return false;
  }
};
