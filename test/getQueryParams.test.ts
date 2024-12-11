/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@onesy/utils/getQueryParams', () => {

  post(() => reset());

  to('getQueryParams', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.getQueryParams(),
        window.history.replaceState(null, null, `?q=a&a=a%2Ca4`), window.OnesyUtils.getQueryParams(),
        window.history.replaceState(null, null, `?q=a&a=4`), window.OnesyUtils.getQueryParams(),
        window.OnesyUtils.getQueryParams('?q=a&a=true'),
      ].filter(Boolean);

      return values_;
    });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      { q: 'a' },
      { q: 'a', a: 'a,a4' },
      { q: 'a', a: 4 },
      { q: 'a', a: true },
    ]));
  });

  to('paramName', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.OnesyUtils.getQueryParams(undefined, 'a'),
        window.history.replaceState(null, null, `?q=a&a=a`), window.OnesyUtils.getQueryParams(undefined, 'a'),
        window.OnesyUtils.getQueryParams('?q=a&a=a', 'a'),
      ].filter(Boolean);

      return values_;
    }, { pre: (window: any) => window.history.replaceState(null, null, `?q=a`) });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      'a',
    ]));
  });

  group('options', () => {

    to('castParam', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          window.history.replaceState(null, null, `?q=a&a=4`), window.OnesyUtils.getQueryParams(undefined, undefined, { castParam: true }),
          window.history.replaceState(null, null, `?q=a&a=4`), window.OnesyUtils.getQueryParams(undefined, undefined, { castParam: false }),
        ].filter(Boolean);

        return values_;
      });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        { q: 'a', a: 4 },
        { q: 'a', a: '4' },
      ]));
    });

  });

});
