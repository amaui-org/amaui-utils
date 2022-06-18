/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/pick', () => {

  post(() => reset());

  to('pick', async () => {
    const value = 'abcdefghijklmnopqrstuvwxyz';

    const values_ = [
      AmauiUtils.pick(value).length === 1,
      AmauiUtils.pick(value, -1).length === 1,
      AmauiUtils.pick(value) && AmauiUtils.pick(value).split('').every(character => value.indexOf(character) > -1),
      AmauiUtils.pick(value, 4).length === 4,
      new Array(1e4).fill('').map(() => {
        const value_ = AmauiUtils.pick(value, 1, 4).length;

        return value_ >= 1 && value_ <= 4;
      }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const value = 'abcdefghijklmnopqrstuvwxyz';

      return [
        window.AmauiUtils.pick(value).length === 1,
        window.AmauiUtils.pick(value, -1).length === 1,
        window.AmauiUtils.pick(value) && window.AmauiUtils.pick(value).split('').every(character => value.indexOf(character) > -1),
        window.AmauiUtils.pick(value, 4).length === 4,
        new Array(1e4).fill('').map(() => {
          const value_ = window.AmauiUtils.pick(value, 1, 4).length;

          return value_ >= 1 && value_ <= 4;
        }),
      ];
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      true,
      true,
      true,
      new Array(1e4).fill(true),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      const value = 'abcdefghijklmnopqrstuvwxyz';

      return [
        (value as any).pick().length === 1,
      ];
    });

    AmauiUtils.polyfills();

    const value = 'abcdefghijklmnopqrstuvwxyz';

    const values_ = [
      (value as any).pick().length === 1,
    ];

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
    ]));
  });

});
