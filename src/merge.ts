import is from './is';
import copy from './copy';

export interface IOptions {
  copy?: boolean;
  merge?: {
    array?: boolean;
  };
}

const optionsDefault: IOptions = {
  copy: false,
  merge: {
    array: false,
  },
};

const merge = <T extends unknown>(
  target: T,
  source: any,
  options_: IOptions = copy(optionsDefault)
): T => {
  const options = { ...optionsDefault, ...options_ };

  if (
    options.merge.array &&
    is('array', target) && is('array', source)
  ) {
    const length = Math.max((target as any[]).length, (source as any[]).length);

    for (let i = 0; i < length; i++) {
      if (target[i] === undefined) target[i] = source[i];

      if (
        (is('object', target[i]) && is('object', source[i])) ||
        is('array', target[i]) && is('array', source[i])
      ) target[i] = merge(target[i], source[i], options);
    }
  }

  if (is('object', target) && is('object', source)) {
    Object.keys(source).forEach(key => {
      // We only care about direct target object properties
      // not about inherited properties from a prototype chain
      if (target.hasOwnProperty(key)) {
        if (is('object', target[key]) && is('object', source[key])) target[key] = merge(target[key], source[key], options);
      }
      else target[key] = options.copy ? copy(source[key]) : source[key];
    });
  }

  return target;
};

export default merge;
