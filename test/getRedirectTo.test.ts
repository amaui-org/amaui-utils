/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@amaui/utils/getRedirectTo', () => {

  post(() => reset());

  to('getRedirectTo', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        undefined,
        'a',
        4,
        { a: 4 },
      ];

      return values_.map((value: any) => window.AmauiUtils.getRedirectTo(value));
    });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '%2F%3Fq%3Da%26a%3D4',
      'a',
      '4',
      '%5Bobject%20Object%5D',
    ]));

    values.forEach(value => assert(value.map((item: any) => decodeURIComponent(item))).eql([
      '/?q=a&a=4',
      'a',
      '4',
      '[object Object]',
    ]));
  });

});
