import isEnvironment from './isEnvironment';

export default function isState(
  type: string
) {
  switch (type) {
    case 'online':
      return isEnvironment('browser') && window.navigator.onLine;

    case 'offline':
      return isEnvironment('browser') && !window.navigator.onLine;

    default:
      return false;
  }
}
