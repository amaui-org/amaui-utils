import is from './is';
import castParam from './castParam';

export const getObjectPropertyValue = (
  object: object,
  keys?: string | string[]
): any => {
  if (!object || !keys) return;

  if (is('string', keys)) {
    const keys_ = (keys as string).split('.').filter(Boolean).map(key => castParam(key));

    return getObjectPropertyValue(object, keys_);
  }

  if (is('array', keys)) {
    const key = keys[0];

    if (keys.length === 1) return object[key];
    if (object.hasOwnProperty(key)) return getObjectPropertyValue(object[key], keys.slice(1));
  }
};

export default getObjectPropertyValue;
