import isEnvironment from './isEnvironment';

export type TIsResponsiveType = 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'tv';

export default function isResponsive(
  type: TIsResponsiveType,
  value?: any
) {
  let value_: any;

  switch (type) {
    case 'mobile':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (max-width: 767px)').matches;

    case 'tablet':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 768px) and (max-width: 1279px)').matches;

    case 'laptop':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 1280px) and (max-width: 1919px)').matches;

    case 'desktop':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 1920px) and (max-width: 2559px)').matches;

    case 'tv':
      value_ = value !== undefined ? value : isEnvironment('browser') && window;

      return isEnvironment('browser') && value_.matchMedia('only screen and (min-width: 2560px)').matches;

    default:
      return false;
  }
}
