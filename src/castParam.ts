import is from './is';

export interface IOptions {
  decode?: boolean;
  decodeMethod?: (value: string) => string;
}

const optionsDefault: IOptions = {
  decode: false,
  decodeMethod: decodeURIComponent,
};

const castParam = (
  value: any,
  options_: IOptions = {}
): any => {
  const options = { ...optionsDefault, ...options_ };

  let newValue: any = value;

  try {
    if (
      is('string', value) &&
      options.decode &&
      is('function', options.decodeMethod)
    ) newValue = options.decodeMethod(value);
  }
  catch (error) { }

  try {
    if (is('string', newValue)) {
      if ('undefined' === newValue) return undefined;
      if ('NaN' === newValue) return NaN;

      return JSON.parse(newValue);
    }

    return newValue;
  }
  catch (error) { }

  return newValue;
};

export default castParam;
