import SHA256 from 'crypto-js/sha256';

import serialize from './serialize';
import merge from './merge';

export interface IOptions {
  serialize?: boolean;
  withPrefix?: boolean;
}

const optionsDefault: IOptions = {
  serialize: true,
  withPrefix: true,
};

const hash = (value_: any, options_ = optionsDefault): string => {
  const options = merge(options_, optionsDefault);
  let value: any = value_;

  if (options.serialize) value = serialize(value);

  value = SHA256(value).toString();

  return options.withPrefix ? `0x${value}` : value;
};

export default hash;
