/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getLeadingZerosNumber', () => {

  post(() => reset());

  to('getLeadingZerosNumber', async () => {
    const values_ = [
      -1,
      0,
      1,
      14,
      134,
      '-1',
      '0',
      '1',
      '14',
      '134',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        -1,
        0,
        1,
        14,
        134,
        '-1',
        '0',
        '1',
        '14',
        '134',
      ];

      return values_.map((value: any) => window.AmauiUtils.getLeadingZerosNumber(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.getLeadingZerosNumber(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '-1',
      '00',
      '01',
      '14',
      '134',
      '-1',
      '00',
      '01',
      '14',
      '134',
    ]));
  });

  group('options', () => {

    to('leadingZeros', async () => {
      const values_ = [
        -1,
        0,
        1,
        14,
        134,
        1340,
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          -1,
          0,
          1,
          14,
          134,
          1340,
        ];

        return values_.map((value: any) => window.AmauiUtils.getLeadingZerosNumber(value, { leadingZeros: 2 }));
      });
      const valueNode = values_.map((value: any) => AmauiUtils.getLeadingZerosNumber(value, { leadingZeros: 2 }));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        '-1',
        '000',
        '001',
        '014',
        '134',
        '1340',
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        (1 as any).getLeadingZeros(),
        ('1' as any).getLeadingZerosNumber(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      (1 as any).getLeadingZeros(),
      ('1' as any).getLeadingZerosNumber(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      '01',
      '01',
    ]));
  });

});
