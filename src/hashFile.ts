import SHA256 from 'crypto-js/sha256';

import { isEnvironment } from './is';
import to from './to';
import fileToValue from './fileToValue';
import merge from './merge';

export interface IOptions {
  withPrefix?: boolean;
}

const optionsDefault: IOptions = {
  withPrefix: true,
};

const hashFile = async (value_: any, options_ = optionsDefault): Promise<string> => {
  const options = merge(options_, optionsDefault);
  let value: any = value_;

  value = isEnvironment('browser') ? await fileToValue(value, 'array-buffer') : to(Buffer.from(value), 'arraybuffer');

  value = isEnvironment('browser') ? String.fromCharCode.apply(null, new Uint8Array(value)) : to(value, 'string');

  value = SHA256(value).toString();

  return options.withPrefix ? `0x${value}` : value;
};

export default hashFile;
