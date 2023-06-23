import isEnvironment from './isEnvironment';

export type TIsOSType = 'mac' | 'mobile' | 'android' | 'ios' | 'windows' | 'linux';

export default function isOS(
  type: TIsOSType,
  value?: any
) {
  let value_: any;

  switch (type) {
    case 'mac':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Mac)/i.test(value_.navigator.platform) || value_.navigator.userAgent.indexOf('Mac OS') > -1);

    case 'mobile':
      return isOS('android') || isOS('ios');

    case 'android':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Android)/i.test(value_.navigator.platform) || ['Android', 'android'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    case 'ios':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(iPhone|iPod|iPad)/i.test(value_.navigator.platform) || ['iPhone', 'iPod', 'iPad'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    case 'windows':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Win)/i.test(value_.navigator.platform) || value_.navigator.userAgent.indexOf('Win') > -1);

    case 'linux':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window);

      return isEnvironment('browser') && (/(Linux|Unix)/i.test(value_.navigator.platform) || ['Linux', 'Unix'].some(value__ => value_.navigator.userAgent.indexOf(value__) > -1));

    default:
      return false;
  }
}
