import { is } from './is';

const arrayToParts = (value: any[], parts = 10): any[] => {
  if (is('array', value)) {
    const value_ = [];

    for (let i = 0; i < value.length; i += parts) value_.push(value.slice(i, i + parts));

    return value_;
  }

  return value;
};

export default arrayToParts;
