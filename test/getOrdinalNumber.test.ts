/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/getOrdinalNumber', () => {

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

      return values_.map(value => window.OnesyUtils.getOrdinalNumber(value as any));
    });
    const valueNode = values_.map(value => OnesyUtils.getOrdinalNumber(value as any));
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
        window.OnesyUtils.getOrdinalNumber(1, { onlySufix: true }),
        window.OnesyUtils.getOrdinalNumber(1, { onlySufix: false }),
      ];
    });
    const valueNode = [
      OnesyUtils.getOrdinalNumber(1, { onlySufix: true }),
      OnesyUtils.getOrdinalNumber(1, { onlySufix: false }),
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'st',
      '1st',
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        (4 as any).getOrdinal(),
        ('4' as any).getOrdinalNumber(),
      ];
    });

    OnesyUtils.polyfills();

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
