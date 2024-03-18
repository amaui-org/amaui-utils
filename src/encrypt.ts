import AES from 'crypto-js/aes';

import stringify from './stringify';

const encrypt = (value_: any, privateValue: string): string => {
  const value = stringify(value_);

  return AES.encrypt(value, privateValue).toString();
};

export default encrypt;
