import is from './is';
import castParam from './castParam';

const numberWithCommas = (value_: string | number, delimiter = '.') => {
  const value = castParam(value_);

  if (is('number', value)) return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, delimiter);

  return value;
};

export default numberWithCommas;
