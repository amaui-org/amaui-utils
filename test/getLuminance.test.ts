/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getLuminance', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('getLuminance', async () => {
    const values_ = [
      'rgb(255, 165, 0)',
      'rgb(177, 177, 0)',
      'rgb(0, 245, 0)',
      'rgba(174, 214, 224, 0.44)',
      'rgb(174 214 a)',
      'a',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'rgb(255, 165, 0)',
        'rgb(177, 177, 0)',
        'rgb(0, 245, 0)',
        'rgba(174, 214, 224, 0.44)',
        'rgb(174 214 a)',
        'a',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.getLuminance(value));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.getLuminance(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      0.48,
      0.41,
      0.65,
      0.62,
      ...new Array(6).fill(undefined),
    ]));
  });

});
