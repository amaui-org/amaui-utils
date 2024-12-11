/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/slugify', () => {

  post(() => reset());

  to('slugify', async () => {
    const values_ = [
      'a',
      ' a ',
      `a $*_+~,.()'"!\-;:@ `,
      'a *+~.() a \'"!:@ ab',
      'a 4 , ; a a   a',
      'a 4 , ; a -- a   a',
      4,
      true,
      undefined,
      null,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a',
        ' a ',
        `a $*_+~,.()'"!\-;:@ `,
        'a *+~.() a \'"!:@ ab',
        'a 4 , ; a a   a',
        'a 4 , ; a -- a   a',
        4,
        true,
        undefined,
        null,
      ];

      return values_.map((value: any) => window.OnesyUtils.slugify(value));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.slugify(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      'a',
      'a',
      'a-a-ab',
      'a-4-a-a-a',
      'a-4-a-a-a',
      4,
      true,
      undefined,
      null,
    ]));
  });

  group('options', () => {

    to('lowercase', async () => {
      const valueBrowsers = await evaluate((window: any) => {
        return [
          window.OnesyUtils.slugify('A', { lowercase: true }),
          window.OnesyUtils.slugify('A', { lowercase: false }),
        ];
      });
      const valueNode = [
        OnesyUtils.slugify('A', { lowercase: true }),
        OnesyUtils.slugify('A', { lowercase: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        'a',
        'A',
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('a,a,a,a' as any).slugify(),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('a,a,a,a' as any).slugify(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a-a-a-a',
    ]));
  });

});
