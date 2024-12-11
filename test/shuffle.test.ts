/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/shuffle', () => {

  post(() => reset());

  to('shuffle', async () => {
    const value = 'yvryq6zG(l';

    const values_ = [
      OnesyUtils.shuffle(value),
      OnesyUtils.shuffle(value, 4),
      OnesyUtils.shuffle(value, 40),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const value = 'yvryq6zG(l';

      const values_ = [
        window.OnesyUtils.shuffle(value),
        window.OnesyUtils.shuffle(value, 4),
        window.OnesyUtils.shuffle(value, 40),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(item_ => {
      const item = item_.map((value_: string) => {
        const v = value.split('');
        const v1 = value_.split('');

        return (
          v.every(character => {
            const index = v1.findIndex(item__ => item__ === character);

            v1.splice(index, 1);

            return index >= 0;
          }) &&
          value_.length === value.length
        );
      });

      assert(item).eql(new Array(3).fill(true));
    });
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      const value = 'yvryq6zG(l';

      return [
        (value as any).shuffle(4),
      ];
    });

    OnesyUtils.polyfills();

    const value = 'yvryq6zG(l';

    const valueNode = [
      (value as any).shuffle(4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(item_ => {
      const item = item_.map((value_: string) => {
        const v = value.split('');
        const v1 = value_.split('');

        return (
          v.every(character => {
            const index = v1.findIndex(item__ => item__ === character);

            v1.splice(index, 1);

            return index >= 0;
          }) &&
          value_.length === value.length
        );
      });

      assert(item).eql(new Array(1).fill(true));
    });
  });

});
