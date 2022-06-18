/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/alpha', () => {

  post(() => reset());

  to('alpha', async () => {
    const values_ = [
      '#ff8c00',
      '#ff8c0070',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'rgb(255.414, 140.44, 0.4)',
      'hsl(33, 100%, 50%)',
      'hsla(33.414, 100.44%, 50.4%)',
      'a',
      'rgb(255, 140 a)',
      true,
      undefined,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '#ff8c00',
        '#ff8c0070',
        'rgb(255, 140, 0)',
        'rgba(255, 140, 0, 0.44)',
        'rgb(255.414, 140.44, 0.4)',
        'hsl(33, 100%, 50%)',
        'hsla(33.414, 100.44%, 50.4%)',
        'a',
        'rgb(255, 140 a)',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.AmauiUtils.alpha(value, .4));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.alpha(value, .4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      'rgba(255, 140, 0, 0.4)',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('rgb(255, 140, 0)' as any).alpha(.4),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('rgb(255, 140, 0)' as any).alpha(.4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(255, 140, 0, 0.4)',
    ]));
  });

});
