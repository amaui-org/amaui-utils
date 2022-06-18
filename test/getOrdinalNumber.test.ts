/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getOrdinalNumber', () => {

  post(() => reset());

  to('getOrdinalNumber', async () => {
    const values_ = [
      1,
      2,
      3,
      4,
      11,
      12,
      13,
      14,
      41,
      42,
      43,
      44,
      '1',
      '2',
      '3',
      '4',
      '11',
      '12',
      '13',
      '14',
      '41',
      '42',
      '43',
      '44',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        1,
        2,
        3,
        4,
        11,
        12,
        13,
        14,
        41,
        42,
        43,
        44,
        '1',
        '2',
        '3',
        '4',
        '11',
        '12',
        '13',
        '14',
        '41',
        '42',
        '43',
        '44',
      ];

      return values_.map(value => window.AmauiUtils.getOrdinalNumber(value as any));
    });
    const valueNode = values_.map(value => AmauiUtils.getOrdinalNumber(value as any));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '1st',
      '2nd',
      '3rd',
      '4th',
      '11th',
      '12th',
      '13th',
      '14th',
      '41st',
      '42nd',
      '43rd',
      '44th',
      '1st',
      '2nd',
      '3rd',
      '4th',
      '11th',
      '12th',
      '13th',
      '14th',
      '41st',
      '42nd',
      '43rd',
      '44th',
    ]));
  });

  to('onlySufix', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      return [
        window.AmauiUtils.getOrdinalNumber(1, { onlySufix: true }),
        window.AmauiUtils.getOrdinalNumber(1, { onlySufix: false }),
      ];
    });
    const valueNode = [
      AmauiUtils.getOrdinalNumber(1, { onlySufix: true }),
      AmauiUtils.getOrdinalNumber(1, { onlySufix: false }),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'st',
      '1st',
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        (4 as any).getOrdinal(),
        ('4' as any).getOrdinalNumber(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      (4 as any).getOrdinal(),
      ('4' as any).getOrdinalNumber(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '4th',
      '4th',
    ]));
  });

});
