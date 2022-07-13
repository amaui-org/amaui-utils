import is from './is';
import castParam from './castParam';

export const removeObjectValue = (
  object: object | any[],
  keys: string | string[]
): any => {
  if (!(object || keys)) return object;

  if (is('string', keys)) {
    const keys_ = (keys as string).split('.').filter(Boolean).map(key => castParam(key));

    return removeObjectValue(object, keys_);
  }

  if (is('array', keys)) {
    const key = keys[0];

    // If object or array doesn't have the above key
    // then there's no point in moving forward
    if (object.hasOwnProperty(key)) {
      if (keys.length === 1) {
        if (is('array', object) && is('number', key)) (object as any[]).splice(key as any, 1);
        if (is('object', object) && is('string', key)) delete object[key];
      }
      else removeObjectValue(object[key], keys.slice(1));
    }
  }

  return object;
};

export default removeObjectValue;
