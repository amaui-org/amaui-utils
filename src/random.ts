import { is } from './is';

const random = (min = 1, max = 1e1): number => {
  if (is('number', min) && is('number', max)) return min + Math.floor(Math.random() * ((max - min) + 1));
};

export default random;
