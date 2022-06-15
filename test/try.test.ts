/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/try', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('tryValue', async () => {
    const values_ = [
      AmauiUtils.Try(() => 4),
      AmauiUtils.Try(() => { throw new Error(); }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.Try(() => 4),
        window.AmauiUtils.Try(() => { throw new Error(); }),
      ];

      return values_;
    }, { browsers });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      4,
      undefined,
    ]));
  });

  group('options', () => {

    to('log', async () => {
      global.AMAUI = {
        env: 'test',
      };

      AmauiUtils.Try(() => { throw new Error(); }, { log: true });
      AmauiUtils.Try(() => { throw new Error(); }, { log: false });

      const valueBrowsers = await evaluate((window: any) => {
        window.AMAUI = {
          env: 'test',
        };

        window.AmauiUtils.Try(() => { throw new Error(); }, { log: true });
        window.AmauiUtils.Try(() => { throw new Error(); }, { log: false });

        return [
          window.AMAUI.test.Try.logs.length,
        ];
      }, { browsers });
      const valueNode = [
        global.AMAUI.test.Try.logs.length,
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        1,
      ]));
    });

  });

});
