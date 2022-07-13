import getEnvironment from './getEnvironment';
import setObjectValue from './setObjectValue';
import copy from './copy';

export type TType = 'JSON';

export interface IOptions {
  log?: boolean;
  returnSame?: boolean;
}

const optionsDefault: IOptions = {
  returnSame: true,
};

const parse = (
  value: any,
  type: TType = 'JSON',
  options_: IOptions = copy(optionsDefault)
): any => {
  const options = { ...optionsDefault, ...options_ };

  switch (type) {
    case 'JSON':
      try {
        return JSON.parse(value);
      }
      catch (error) {
        if (options.log) {
          console.error('Parse JSON: ', error);

          const env = getEnvironment();

          if (env.AMAUI?.env === 'test') {
            if (!env.AMAUI?.test?.parse?.logs) setObjectValue(env, 'AMAUI.test.parse.logs', []);

            env.AMAUI.test.parse.logs.push(error);
          }
        }
      }

      break;

    default:
      break;
  }

  if (options.returnSame) return value;
};

export default parse;
