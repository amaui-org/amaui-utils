import { isValid } from './is';

const hexadecimalStringToBinary = (value_: string): string => {
  if (isValid('hexadecimal-string', value_)) {
    let value = '';

    const meta = value_.substring(0, 2);
    const values = value_.substring(2);

    const regular = meta === '00';
    const withoutPadding = meta === '02';
    const remainAsIs = (meta.indexOf('1') === 0) && meta.split('').map(item => +item);

    const lookup = {
      0: '0000', 1: '0001', 2: '0010', 3: '0011',
      4: '0100', 5: '0101', 6: '0110', 7: '0111',
      8: '1000', 9: '1001', 'a': '1010', 'b': '1011',
      c: '1100', d: '1101', e: '1110', f: '1111',
    };

    let parts = values.toLowerCase().split('');

    if (remainAsIs) parts = parts.slice(0, -remainAsIs[1]);

    for (const [index, part] of parts.entries()) {
      value += !(index === parts.length - 1 && withoutPadding) ? lookup[part] : parseInt(lookup[part], 2).toString(2);
    }

    if (remainAsIs) value += values.slice(values.length - remainAsIs[1]);

    return value;
  }
};

export default hexadecimalStringToBinary;
