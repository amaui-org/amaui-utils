import is from './is';

const deserialize = (value: string): any => {
  if (is('string', value)) {
    try {
      return JSON.parse(value);
    }
    catch (error) { }
  }

  return value;
};

export default deserialize;
