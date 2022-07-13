import is from './is';
import setObjectValue from './setObjectValue';

const unflattenObject = (object: object): object => {
  if (is('object', object)) {
    const output = {};

    Object.keys(object).forEach(key => setObjectValue(output, key, object[key]));

    return output;
  }

  return object;
};

export default unflattenObject;
