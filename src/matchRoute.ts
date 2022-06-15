import { match } from 'path-to-regexp';

const matchRoute = (value: string[], path: string): boolean => {
  try {
    for (const route of value) {
      const matched = match(route, { decode: decodeURIComponent })(path);

      if (matched) return !!matched;
    }
  }
  catch (error) {
    return false;
  }

  return false;
};

export default matchRoute;
