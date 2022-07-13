import is from './is';

declare const WorkerGlobalScope: any;

export default function isEnvironment(
  type: string,
  value?: any
) {
  let value_: any;

  switch (type) {
    case 'browser':
      return typeof window !== 'undefined' && typeof window.document !== 'undefined';

    case 'worker':
      return typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope;

    case 'nodejs':
      return !!(typeof global !== 'undefined' && typeof module !== 'undefined' && module.exports);

    case 'localhost':
      value_ = value !== undefined ? value : (isEnvironment('browser') && window.location.hostname);

      return is('string', value_) && ['localhost', '127.0.0.1'].some(value__ => value_.indexOf(value__) > -1);

    default:
      return false;
  }
}
