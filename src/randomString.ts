import pick from './pick';
import clamp from './clamp';
import shuffle from './shuffle';

const randomString = (length_ = 1e1): string => {
  const length = clamp(length_, 4);
  let result = '';

  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
  const numbers = '0123456789';

  const lowPriorityLength = Math.ceil(length * 0.1);

  result += pick(lowercase, (length - (lowPriorityLength * 3)));
  result += pick(uppercase, lowPriorityLength);
  result += pick(specials, lowPriorityLength);
  result += pick(numbers, lowPriorityLength);

  return shuffle(result) as string;
};

export default randomString;
