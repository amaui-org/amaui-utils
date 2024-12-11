/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/pick', () => {

  post(() => reset());

  to('pick', async () => {
    const value = 'abcdefghijklmnopqrstuvwxyz';

    const values_ = [
      OnesyUtils.pick(value).length === 1,
      OnesyUtils.pick(value, -1).length === 1,
      OnesyUtils.pick(value) && OnesyUtils.pick(value).split('').every(character => value.indexOf(character) > -1),
      OnesyUtils.pick(value, 4).length === 4,
      new Array(1e4).fill('').map(() => {
        const value_ = OnesyUtils.pick(value, 1, 4).length;

        return value_ >= 1 && value_ <= 4;
      }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const value = 'abcdefghijklmnopqrstuvwxyz';

      return [
        window.OnesyUtils.pick(value).length === 1,
        window.OnesyUtils.pick(value, -1).length === 1,
        window.OnesyUtils.pick(value) && window.OnesyUtils.pick(value).split('').every(character => value.indexOf(character) > -1),
        window.OnesyUtils.pick(value, 4).length === 4,
        new Array(1e4).fill('').map(() => {
          const value_ = window.OnesyUtils.pick(value, 1, 4).length;

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
      window.OnesyUtils.polyfills();

      const value = 'abcdefghijklmnopqrstuvwxyz';

      return [
        (value as any).pick().length === 1,
      ];
    });

    OnesyUtils.polyfills();

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
