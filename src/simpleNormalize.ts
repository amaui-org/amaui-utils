import is from './is';
import cleanValue, { IOptions as IOptionsCleanValue, optionsDefault as optionsDefaultCleanValue } from './cleanValue';

export interface IOptions {
  clean?: boolean;
  cleanAfter?: boolean;
  optionsCleanValue?: IOptionsCleanValue;
  normalize?: {
    map?: Map<any, any>;
  };
}

export const map = new Map<any, any>([
  ['id', 'ID'],
  ['api', 'API'],
  ['ui', 'UI'],
  ['true', 'yes'],
  ['false', 'no'],
]);

const optionsDefault: IOptions = {
  clean: true,
  cleanAfter: true,
  optionsCleanValue: optionsDefaultCleanValue,
  normalize: {
    map,
  },
};

const simpleNormalize = (
  value: any,
  options_: IOptions = {}
): string => {
  const options = { ...optionsDefault, ...options_ };

  if (is('simple', value)) {
    let newValue = String(value);

    if (options.clean && !options.cleanAfter) newValue = cleanValue(newValue, options.optionsCleanValue);

    if (options.normalize?.map) {
      const mapKeys = options.normalize?.map.keys();

      for (const key of mapKeys) {
        newValue = newValue.replace(new RegExp(`${key}`, 'ig'), options.normalize?.map.get(key));
      }
    }

    if (options.clean && options.cleanAfter) newValue = cleanValue(newValue, options.optionsCleanValue);

    return newValue;
  }

  return value;
};

export default simpleNormalize;
