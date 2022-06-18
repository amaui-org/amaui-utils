/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/numberWithCommas', () => {

  post(() => reset());

  to('numberWithCommas', async () => {
    const values_ = [
      -1,
      -1e4,
      0,
      1,
      1e7,
      '-1',
      '-1e4',
      '0',
      '1',
      '1e7',
      'a',
      true,
      undefined,
      null,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        -1,
        -1e4,
        0,
        1,
        1e7,
        '-1',
        '-1e4',
        '0',
        '1',
        '1e7',
        'a',
        true,
        undefined,
        null,
      ];

      return values_.map((value: any) => window.AmauiUtils.numberWithCommas(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.numberWithCommas(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '-1',
      '-10,000',
      '0',
      '1',
      '10,000,000',
      '-1',
      '-10,000',
      '0',
      '1',
      '10,000,000',
      'a',
      true,
      undefined,
      null,
    ]));
  });

  to('delimiter', async () => {
    const values_ = [
      1e4,
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        1e4,
      ];

      return values_.map((value: any) => window.AmauiUtils.numberWithCommas(value, '.'));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.numberWithCommas(value, '.'));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '10.000',
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        (1e4 as any).withCommas(),
        ('1e4' as any).numberWithCommas(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      (1e4 as any).withCommas(),
      ('1e4' as any).numberWithCommas(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '10,000',
      '10,000',
    ]));
  });

});
