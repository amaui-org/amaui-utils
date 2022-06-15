import { is } from './is';
import merge from './merge';
import getEnvironment from './getEnvironment';
import setObjectValue from './setObjectValue';

export interface IOptions {
  log?: boolean;
}

const optionsDefault: IOptions = {};

const Try = (
  value: () => any,
  options_: IOptions = optionsDefault
): any => {
  const options = merge(options_, optionsDefault);

  try {
    return is('function', value) ? value() : undefined;
  }
  catch (error) {
    if (options.log) {
      console.error('Try: ', error);

      const env = getEnvironment();

      if (env.AMAUI?.env === 'test') {
        if (!env.AMAUI?.test?.Try?.logs) setObjectValue(env, 'AMAUI.test.Try.logs', []);

        env.AMAUI.test.Try.logs.push(error);
      }
    }
  }
};

export default Try;
