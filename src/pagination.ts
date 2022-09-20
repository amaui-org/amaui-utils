const pagination = (value = 1, total = 10, boundary = 1, middle = 1) => {
  const array = [];

  const min = (boundary * 2) + (1 + (middle * 2)) + 2;

  // start
  let value_ = 1;
  let dots = 'start';
  let dotsIndex = 0;

  while (value_ < boundary + 1 && value_ < value - middle) array.push(value_++);

  // start dots
  if ((value - middle) - (boundary) > 1) {
    if ((value - middle) - (boundary) === 2) array.push(boundary + 1);
    else {
      array.push('...');

      dotsIndex = array.length - 1;
    }
  }

  // middle
  value_ = value - middle < 1 ? 1 : value - middle;

  while (value_ < value + middle + 1 && value_ < total) array.push(value_++);

  // end dots
  if ((total - boundary + 1) - (value + middle) > 1) {
    if ((total - boundary + 1) - (value + middle) === 2) array.push(value + middle + 1);
    else {
      array.push('...');

      dots = 'end';

      dotsIndex = array.length - 1;
    };
  }

  // end
  value_ = value + middle + 1 > total ? total : value + middle + 1;

  while (value_ < total + 1) {
    if (value_ >= total - boundary + 1 && value_ < total + 1) array.push(value_);

    value_++;
  }

  // Update values up to min value
  if (array.length < min) {
    let toAdd = min - array.length;

    if (dots === 'start') {
      let i = dotsIndex + 1;

      let valueStart = array[dotsIndex + 1] - toAdd - 1;

      while (toAdd > 0) {
        array.splice(i++, 0, ++valueStart);

        toAdd--;
      }
    }

    if (dots === 'end') {
      let i = dotsIndex;

      let valueStart = array[dotsIndex - 1];

      while (toAdd > 0) {
        array.splice(i++, 0, ++valueStart);

        toAdd--;
      }
    }
  }

  return array;
};

export default pagination;
