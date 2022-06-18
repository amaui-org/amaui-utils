/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/randomString', () => {

  post(() => reset());

  to('randomString', async () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
    const numbers = '0123456789';

    const lowPriorityLength = Math.ceil(14 * 0.1);

    const value: string = AmauiUtils.randomString(14);

    const used = [
      [lowercase, 14 - (lowPriorityLength * 3)],
      [uppercase, lowPriorityLength],
      [specials, lowPriorityLength],
      [numbers, lowPriorityLength],
    ];

    const values_ = [
      AmauiUtils.randomString().length === 10,
      used.every((item: any) => (
        value.split('').filter(item_ => item[0].indexOf(item_) > -1).length === item[1]
      )),
      new Array(1e4).fill('').map(() => {
        const value_ = AmauiUtils.randomString(4).length;

        return value_ >= 1 && value_ <= 4;
      }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const lowercase = 'abcdefghijklmnopqrstuvwxyz';
      const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const specials = '!@#$%^&*()_+{}:"<>?\|[];\',./`~';
      const numbers = '0123456789';

      const lowPriorityLength = Math.ceil(14 * 0.1);

      const value: string = window.AmauiUtils.randomString(14);

      const used = [
        [lowercase, 14 - (lowPriorityLength * 3)],
        [uppercase, lowPriorityLength],
        [specials, lowPriorityLength],
        [numbers, lowPriorityLength],
      ];

      const values_ = [
        window.AmauiUtils.randomString().length === 10,
        used.every((item: any) => (
          value.split('').filter(item_ => item[0].indexOf(item_) > -1).length === item[1]
        )),
        new Array(1e4).fill('').map(() => {
          const value_ = window.AmauiUtils.randomString(4).length;

          return value_ >= 1 && value_ <= 4;
        }),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      true,
      new Array(1e4).fill(true),
    ]));
  });

});
