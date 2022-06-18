/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@amaui/utils/updateQueryParams', () => {

  post(() => reset());

  to('updateQueryParams', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '',
        undefined,
        true,
        null,
        { q: undefined },
        { a: undefined },
        { a: 'a' },
        { q: 4, a: 'a' },
        { q: 4, a: 'a', ab: new Map(), ad: function a() { } },
      ].map(item => {
        window.AmauiUtils.updateQueryParams(item);

        const value = window.location.search;

        window.history.replaceState(null, null, '?q=a');

        return value;
      });

      return values_;
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '?q=a&a=4',
      '?q=a',
      '?q=a',
      '?q=a',
      '',
      '?q=a',
      '?q=a&a=a',
      '?q=4&a=a',
      '?q=4&a=a&ab=%5Bobject%20Map%5D&ad=function%20a()%20%7B%20%7D'
    ]));
  });

  to('override', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [{ q: undefined }, true],
        [{ q: undefined }, false],
        [{ q: 4, a: 'a' }, true],
        [{ q: 4, a: 'a' }, false],
      ].map((item: any) => {
        window.AmauiUtils.updateQueryParams(...item);

        const value = window.location.search;

        window.history.replaceState(null, null, '?q=a');

        return value;
      });

      return values_;
    });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '',
      '?q=a',
      '?q=4&a=a',
      '?q=a&a=a'
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      ({ a: 4, q: 4 } as any).updateQueryParams();

      return [
        window.location.search,
      ];
    });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '?q=4&a=4',
    ]));
  });

});
