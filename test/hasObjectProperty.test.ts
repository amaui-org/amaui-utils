/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/hasObjectProperty', () => {

  post(() => reset());

  to('hasObjectProperty', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [
          { a: 1114, ad: { a: 114 }, a14: [1, { a: 14 }] },
          'a.a1',
          'ad.aad.a',
          'ad.a'
        ]
      ].map(item => window.AmauiUtils.hasObjectProperty(...item));

      return values_;
    });

    const valueNode = [
      [
        { a: 1114, ad: { a: 114 }, a14: [1, { a: 14 }] },
        'a.a1',
        'ad.aad.a',
        'ad.a'
      ]
    ].map((item: [any, any, any, any]) => AmauiUtils.hasObjectProperty(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true
    ]));
  });

});
