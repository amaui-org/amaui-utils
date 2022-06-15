import AES from 'crypto-js/AES';
import encUtf8 from 'crypto-js/enc-utf8';

import merge from './merge';
import deserialize from './deserialize';

export interface IOptions {
  exception?: boolean;
}

const optionsDefault: IOptions = {
  exception: false,
};

const decrypt = (value_: string, privateValue: string, options_: IOptions = optionsDefault): any | undefined | Error => {
  const options = merge(options_, optionsDefault);

  let value = value_;

  try {
    value = AES.decrypt(value_, privateValue).toString(encUtf8);
  }
  catch (error) {
    value = '';
  }

  // This is only incorrect,
  // when encrypted data is an empty string
  // it's a lib issue not giving any
  // incorrect privateValue information atm
  if (!value.length) {
    if (options.exception) throw new Error('Private value is incorrect');

    return;
  }

  return deserialize(value);
};

export default decrypt;
