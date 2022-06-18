/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/random', () => {

  post(() => reset());

  to('random', async () => {
    const values_ = [
      new Array(1e4).fill('').map(() => {
        const value_ = AmauiUtils.random(1, 4);

        return value_ >= 1 && value_ <= 4;
      }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        new Array(1e4).fill('').map(() => {
          const value_ = window.AmauiUtils.random(1, 4);

          return value_ >= 1 && value_ <= 4;
        }),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      new Array(1e4).fill(true),
    ]));
  });

});
