import { is } from './is';
import merge from './merge';
import capitalize from './capitalize';
import hash from './hash';

export interface IOptions {
  filters?: string[];
  className?: boolean;
  cammelCaseTransform?: boolean;
  url?: boolean;
  replaceWith?: string;
  trim?: boolean;
  capitalize?: boolean;
  lowercase?: boolean;
}

export const optionsDefault: IOptions = {
  filters: [',', '.', '-', '_', '\s+'],
  replaceWith: ' ',
  trim: true,
};

class AmauiCache {
  public static caches = {};

  public static add(value: any, ...args: any[]): void {
    const key = hash(args) as string;

    if (!this.caches[key]) this.caches[key] = value;
  }

  public static get(...args: any[]): undefined | any {
    const key = hash(args) as string;

    return this.caches[key];
  }

  public static has(...args: any[]): boolean {
    const key = hash(args) as string;

    return this.caches.hasOwnProperty(key);
  }
}

const cleanValue = (
  value_: string,
  options_: IOptions = optionsDefault
): string | any => {
  try {
    const options = merge(options_, optionsDefault);

    if (AmauiCache.has(value_, options)) return AmauiCache.get(value_, options);

    // Few predefined options
    // for className cammel case to regular
    // css property names convert
    if (options.className) {
      options.replaceWith = '-';
      options.cammelCaseTransform = true;
      options.lowercase = true;
    }

    const saveToCache = (value: any) => AmauiCache.add(value, value_, options_);

    if (is('string', value_)) {
      let value = value_;

      if (options.url) {
        const parts = value.split('?').filter(Boolean);

        let path = parts[0];
        const query = parts[1];

        if (path.slice(-1) === '/') path = path.slice(0, -1);

        value = query ? [path, query].join('?') : path;

        // Save to cache
        saveToCache(value);

        return value;
      }

      if (options.cammelCaseTransform) value = value.split(/(?=[A-Z])/g).join(options.replaceWith || ' ');

      options.filters.forEach(filter => {
        const expression = `\\${filter}`;
        const regexp = new RegExp(expression, 'g');

        value = value.replace(regexp, options.replaceWith || ' ');
      });

      if (options.trim) value = value.trim();
      if (options.capitalize) value = capitalize(value);
      if (options.lowercase) value = value.toLocaleLowerCase();

      // Save to cache
      saveToCache(value);

      return value;
    }

    // Save to cache
    saveToCache(value_);

    return value_;
  }
  catch (error) { }

  return value_;
};

export default cleanValue;
