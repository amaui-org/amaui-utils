import isValid from './isValid';
import isEnvironment from './isEnvironment';
import cleanValue from './cleanValue';
import copy from './copy';

export interface IOptions {
  URL?: boolean;
}

const optionsDefault: IOptions = {};

export const getURL = (
  value: string,
  options_: IOptions = copy(optionsDefault)
): URL | string => {
  const options = { ...optionsDefault, ...options_ };

  let url: URL;

  try {
    if (isValid('url', value)) url = new URL(value);
    else if (isEnvironment('localhost', value)) url = new URL(value.indexOf('http') > -1 ? value : `https://${value}`);
    else {
      url = new URL(isEnvironment('browser') ? window.location.href : 'https://localhost');

      const [pathname, search] = value.split('?').filter(Boolean);

      if (pathname) url.pathname = pathname;
      if (search) url.search = search;
    }

    return options.URL ? url : cleanValue(url.href, { url: true });
  }
  catch (error) { }

  return '';
};

export default getURL;
