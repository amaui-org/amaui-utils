import { is } from './is';

const order = <T>(value: T): T => {
  if (is('object', value)) {
    const newValue = {};

    Object.keys(value).sort().map(key => newValue[key] = order(value[key]));

    return newValue as T;
  }

  if (is('array', value)) {
    const newValue = [];

    (value as unknown as Array<any>).sort().map((_, index) => newValue[index] = order(value[index]));

    return newValue as unknown as T;
  }

  return value;
};

export default order;
