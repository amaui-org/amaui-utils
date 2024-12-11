/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/darken', () => {

  post(() => reset());

  to('darken', async () => {
    const values_ = [
      '#ff8c00',
      '#ff8c0070',
      'rgb(255, 140, 0)',
      'rgba(255, 140, 0, 0.44)',
      'hsl(33, 100%, 50%)',
      'hsla(33.414, 100.41%, 50.4%, 0.4)',
      'rgb(174 214 a)',
      'a',
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
        'hsl(33, 100%, 50%)',
        'hsla(33.414, 100.41%, 50.4%, 0.4)',
        'rgb(174 214 a)',
        'a',
        true,
        undefined,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.OnesyUtils.darken(value, .4));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.darken(value, .4));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgb(153, 84, 0)',
      'rgba(153, 84, 0, 0.44)',
      'rgb(153, 84, 0)',
      'rgba(153, 84, 0, 0.44)',
      'rgb(153, 84, 0)',
      'rgba(153, 84, 0, 0.4)',
      ...new Array(6).fill(undefined),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      return [
        ('rgba(255, 140, 0, 0.4)' as any).darken(.4),
      ];
    });

    OnesyUtils.polyfills();

    const valueNode = [
      ('rgba(255, 140, 0, 0.4)' as any).darken(.4),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'rgba(153, 84, 0, 0.4)',
    ]));
  });

});
