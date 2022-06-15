/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

group('@amaui/utils/getRedirectTo', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('getRedirectTo', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        undefined,
        'a',
        4,
        { a: 4 },
      ];

      return values_.map((value: any) => window.AmauiUtils.getRedirectTo(value));
    }, { browsers });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '%2F%3Fq%3Da',
      'a',
      '4',
      '%5Bobject%20Object%5D',
    ]));

    values.forEach(value => assert(value.map((item: any) => decodeURIComponent(item))).eql([
      '/?q=a',
      'a',
      '4',
      '[object Object]',
    ]));
  });

});
