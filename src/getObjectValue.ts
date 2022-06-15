import getObjectPropertyValue from './getObjectPropertyValue';

const getObjectValue = (
  object: object,
  ...args: string[]
): any => {
  if (!object || !args.length) return;

  let value: any;

  const keys = args.filter(Boolean);

  for (const key of keys) {
    value = getObjectPropertyValue(object, key);

    if (value !== undefined) return value;
  }
};

export default getObjectValue;
