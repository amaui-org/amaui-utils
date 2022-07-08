import { TMethod } from './models';

interface IDebounceMethod {
  (...args: any[]): any;
  clear: () => void;
}

const debounce = (
  method_: TMethod,
  delay: number = 140
): IDebounceMethod => {
  let timeoutId: NodeJS.Timeout;

  function method(...args: any[]) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => method_.apply(this, args), delay);
  }

  method.clear = () => clearTimeout(timeoutId);

  return method;
};

export default debounce;
