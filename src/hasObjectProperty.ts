import hasObjectPropertyValue from './hasObjectPropertyValue';

const hasObjectProperty = (
  object: object,
  ...args: string[]
): boolean => {
  if (!object || !args.length) return false;

  let value: any;

  const keys = args.filter(Boolean);

  for (const key of keys) {
    value = hasObjectPropertyValue(object, key);

    if (value === true) return true;
  }

  return false;
};

export default hasObjectProperty;
