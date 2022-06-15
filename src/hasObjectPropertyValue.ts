import { is } from './is';
import castParam from './castParam';

export const hasObjectPropertyValue = (
  object: object,
  keys?: string | string[]
): boolean => {
  if (!object || !keys) return false;

  if (is('string', keys)) {
    const keys_ = (keys as string).split('.').filter(Boolean).map(key => castParam(key));

    return hasObjectPropertyValue(object, keys_);
  }

  if (is('array', keys)) {
    const key = keys[0];

    if (keys.length === 1) return object.hasOwnProperty(key);
    if (object.hasOwnProperty(key)) return hasObjectPropertyValue(object[key], keys.slice(1));
  }

  return false;
};

export default hasObjectPropertyValue;
