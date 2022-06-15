/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/shuffle', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('shuffle', async () => {
    const value = 'yvryq6zG(l';

    const values_ = [
      AmauiUtils.shuffle(value),
      AmauiUtils.shuffle(value, 4),
      AmauiUtils.shuffle(value, 40),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const value = 'yvryq6zG(l';

      const values_ = [
        window.AmauiUtils.shuffle(value),
        window.AmauiUtils.shuffle(value, 4),
        window.AmauiUtils.shuffle(value, 40),
      ];

      return values_;
    }, { browsers });
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
      window.AmauiUtils.polyfills();

      const value = 'yvryq6zG(l';

      return [
        (value as any).shuffle(4),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

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
