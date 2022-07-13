import is from './is';
import { TMethod } from './models';
import copy from './copy';

export interface IOptions {
  onError?: 'reject' | 'resolve';
}

const optionsDefault: IOptions = {
  onError: 'reject',
};

const promisify = <T>(
  method: TMethod | Promise<any>,
  options_: IOptions = copy(optionsDefault)
): (...args: any[]) => Promise<T | any> => async (...args: any[]) => {
  const options = { ...optionsDefault, ...options_ };

  if (is('promise', method)) return method as unknown as Promise<any>;

  let resolve: TMethod;
  let reject: TMethod;

  const promise = new Promise((resolve_, reject_) => {
    resolve = resolve_;
    reject = reject_;
  });

  const resolveMethod = (...args_: any[]) => {
    const error = args_.find(item => is('error', item));

    const response = args_.length <= 1 ? args_[0] : args_;

    if (error && options.onError === 'reject') return reject(error);

    return resolve(response);
  };

  if (is('function', method)) {
    try {
      await (method as TMethod)(...args, resolveMethod);
    }
    catch (error) {
      return reject(error);
    }
  }
  else resolve();

  return promise;
};

export default promisify;
