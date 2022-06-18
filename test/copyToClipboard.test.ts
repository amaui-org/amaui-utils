/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset, utils } from '../utils/js/test/utils';

group('@amaui/utils/copyToClipboard', () => {

  // Only chromium allows it atm
  pre(async () => {
    utils.browsers.chromium.context.grantPermissions([
      'clipboard-read',
      'clipboard-write',
    ]);
  });

  post(async () => reset());

  to('copyToClipboard', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const values_ = [
        'a',
        4,
        true,
        null,
        undefined,
        { a: 'a4' },
        [1, 4, 1],
      ];

      const values = [];

      for (const value of values_) {
        window.AmauiUtils.copyToClipboard(value);

        values.push(await navigator.clipboard.readText());
      }

      return values;
    }, { browsers: { chromium: utils.browsers.chromium } });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      '4',
      'true',
      'null',
      'undefined',
      '{\n  \"a\": \"a4\"\n}',
      '[\n  1,\n  4,\n  1\n]',
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.AmauiUtils.polyfills();

      const values_ = [
        'a',
        4,
        true,
        { a: 'a4' },
        [1, 4, 1],
      ];

      const values = [];

      for (const value of values_) {
        (value as any).copyToClipboard();

        values.push(await navigator.clipboard.readText());
      }

      return values;
    }, { browsers: { chromium: utils.browsers.chromium } });

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'a',
      '4',
      'true',
      '{\n  \"a\": \"a4\"\n}',
      '[\n  1,\n  4,\n  1\n]',
    ]));
  });

});
