import is from './is';
import isEnvironment from './isEnvironment';
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
  options_: IOptions = {}
): object | string | number | boolean | undefined => {
  const options = { ...optionsDefault, ...options_ };

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
