import isEnvironment from './isEnvironment';

export type TIsStateType = 'online' | 'offline';

export default function isState(
  type: TIsStateType
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
