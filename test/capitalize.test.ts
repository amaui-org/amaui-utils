/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/capitalize', () => {

  post(() => reset());

  to('capitalize', async () => {
    const values_ = [
      'a',
      'a a A a',
      'A a',
      undefined,
      '',
      4,
      true,
      null,
      new Array(),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a',
        'a a A a',
        'A a',
        undefined,
        '',
        4,
        true,
        null,
        new Array(),
      ];

      return values_.map((value: any) => window.OnesyUtils.capitalize(value));
    });
    const valueNode = values_.map((value: any) => OnesyUtils.capitalize(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'A',
      'A a A a',
      'A a',
      undefined,
      '',
      4,
      true,
      null,
      new Array(),
    ]));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.OnesyUtils.polyfills();

      const values_ = [
        'a',
      ];

      return values_.map((value: any) => value.capitalize());
    });

    OnesyUtils.polyfills();

    const values_ = [
      'a',
    ];

    const valueNode = values_.map((value: any) => value.capitalize());

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'A',
    ]));
  });

});
