/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/slugify', () => {

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

      return values_.map((value: any) => window.AmauiUtils.slugify(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.slugify(value));
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
          window.AmauiUtils.slugify('A', { lowercase: true }),
          window.AmauiUtils.slugify('A', { lowercase: false }),
        ];
      });
      const valueNode = [
        AmauiUtils.slugify('A', { lowercase: true }),
        AmauiUtils.slugify('A', { lowercase: false }),
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
      window.AmauiUtils.polyfills();

      return [
        ('a,a,a,a' as any).slugify(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('a,a,a,a' as any).slugify(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a-a-a-a',
    ]));
  });

});
