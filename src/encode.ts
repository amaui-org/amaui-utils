import { isEnvironment } from './is';
import serialize from './serialize';

const encode = (value_: any): string => {
  const value = serialize(value_);

  if (!isEnvironment('nodejs')) return btoa(value);

  return Buffer.from(value, 'binary').toString('base64');
};

export default encode;
