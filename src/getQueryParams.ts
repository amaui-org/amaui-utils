import { is, isEnvironment } from './is';
import merge from './merge';
import castParam from './castParam';

export interface IOptions {
  castParam?: boolean;
}

const optionsDefault: IOptions = {
  castParam: true,
};

const getQueryParams = (
  value_ = isEnvironment('browser') && window.location.search,
  paramName?: string,
  options_: IOptions = optionsDefault
): object | string | number | boolean | undefined => {
  const options = merge(options_, optionsDefault);

  if (is('string', value_)) {
    const result = {};

    const paramPairs = value_.replace(/^\?/, '').split('&').filter(Boolean);

    paramPairs.forEach(param => {
      const [key, value] = param.split('=').filter(Boolean).map(item => options.castParam ? castParam(decodeURIComponent(item)) : decodeURIComponent(item));

      if (!!key) result[key] = value;
    });

    return paramName !== undefined ? result[paramName] : result;
  }
};

export default getQueryParams;
