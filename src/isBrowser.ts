import isEnvironment from './isEnvironment';

export type TIsBrowserType = 'chrome' | 'opera' | 'firefox' | 'safari' | 'edge-chromium' | 'edge' | 'ie';

export default function isBrowser(
  type: TIsBrowserType,
  value?: any
) {
  let value_: any;

  switch (type) {
    case 'chrome':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (!!(value_['chrome']?.webstore || value_['chrome']?.runtime) || value_.navigator.userAgent.indexOf('Chrome') > -1);

    case 'opera':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (!!value_['opr']?.addons || !!value_['opera'] || value_.navigator.userAgent.indexOf(' OPR') > -1);

    case 'firefox':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (typeof value_['InstallTrigger'] !== 'undefined' || ['Firefox'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    case 'safari':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (function (p) { return p.toString() === '[object SafariRemoteNotification]'; })(!value_['safari'] || (value_['safari']?.pushNotification));

    case 'edge-chromium':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (isBrowser('chrome', value) && value_.navigator.userAgent.indexOf('Edg') > -1);

    case 'edge':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (!isBrowser('ie', value) && (value_.navigator.userAgent.indexOf('Edg') > -1));

    case 'ie':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/*@cc_on!@*/false || !!value_.document['documentMode']);

    default:
      return false;
  }
}
