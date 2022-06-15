/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

group('@amaui/utils/getQueryParams', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('getQueryParams', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.getQueryParams(),
        window.history.replaceState(null, null, `?q=a&a=a%2Ca4`), window.AmauiUtils.getQueryParams(),
        window.history.replaceState(null, null, `?q=a&a=4`), window.AmauiUtils.getQueryParams(),
        window.AmauiUtils.getQueryParams('?q=a&a=true'),
      ].filter(Boolean);

      return values_;
    }, { browsers });
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
        window.AmauiUtils.getQueryParams(undefined, 'a'),
        window.history.replaceState(null, null, `?q=a&a=a`), window.AmauiUtils.getQueryParams(undefined, 'a'),
        window.AmauiUtils.getQueryParams('?q=a&a=a', 'a'),
      ].filter(Boolean);

      return values_;
    }, { browsers, pre: (window: any) => window.history.replaceState(null, null, `?q=a`) });
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
          window.history.replaceState(null, null, `?q=a&a=4`), window.AmauiUtils.getQueryParams(undefined, undefined, { castParam: true }),
          window.history.replaceState(null, null, `?q=a&a=4`), window.AmauiUtils.getQueryParams(undefined, undefined, { castParam: false }),
        ].filter(Boolean);

        return values_;
      }, { browsers });
      const values = [...valueBrowsers];

      values.forEach(value => assert(value).eql([
        { q: 'a', a: 4 },
        { q: 'a', a: '4' },
      ]));
    });

  });

});
