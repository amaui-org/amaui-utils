import AES from 'crypto-js/AES';

import serialize from './serialize';

const encrypt = (value_: any, privateValue: string): string => {
  const value = serialize(value_);

  return AES.encrypt(value, privateValue).toString();
};

export default encrypt;
