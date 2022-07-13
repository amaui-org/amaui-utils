import is from './is';
import clamp from './clamp';
import random from './random';

const pick = (
  value: string,
  min = 1,
  max?: number
): string => {
  if (is('string', value)) {
    let result = '';
    let toPick = clamp(min, 1);

    if (max > 0 && max > min) toPick = random(min, max);

    for (let i = 0; i < toPick; i++) result += value.charAt(Math.floor(Math.random() * value.length));

    return result;
  }
};

export default pick;
