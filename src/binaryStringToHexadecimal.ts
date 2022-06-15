import { isValid } from './is';

const binaryStringToHexadecimal = (value_: string): string => {
  if (isValid('binary-string', value_)) {
    let value = '';

    const parts = value_.match(/.{1,4}/g) || [];

    for (const [index, part] of parts.entries()) {
      const decimal = [...part].reduce((result, item) => result = (result * 2) + parseInt(item, 10), 0);

      const hexadecimal = decimal.toString(16);

      if (index === parts.length - 1) {
        if (part.length < 4) {
          if (
            (part.length === 1 && ['0', '1'].indexOf(hexadecimal) > -1) ||
            (+hexadecimal > 1 && +hexadecimal <= 7)
          ) value = '02' + value + hexadecimal;
          else value = '1' + String(part.length) + value + part;
        }
        else value = '00' + value + hexadecimal;
      }
      else value += hexadecimal;
    }

    return value;
  }
};

export default binaryStringToHexadecimal;
