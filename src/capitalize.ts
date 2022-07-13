import is from './is';

const capitalize = (value: string): string => {
  if (is('string', value)) return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;

  return value;
};

export default capitalize;
