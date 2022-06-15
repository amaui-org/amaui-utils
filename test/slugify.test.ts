/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/slugify', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

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
    }, { browsers });
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
      }, { browsers });
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
    }, { browsers });

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
