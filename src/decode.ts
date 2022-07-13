import isEnvironment from './isEnvironment';
import deserialize from './deserialize';

const decode = (value_: string): any => {
  if (value_ !== undefined) {
    const value = isEnvironment('browser') ? atob(value_) : Buffer.from(value_, 'base64').toString('utf-8');

    return deserialize(value);
  }
};

export default decode;
