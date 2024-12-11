/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/matchRoute', () => {

  post(() => reset());

  to('matchRoute', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        '/',
        '/posts/140',
        '/blog/posts/140',
        '/tag/140',
        '/blog/tags/140',
      ];

      return values_.map(value => window.OnesyUtils.matchRoute([
        '/',
        '/blog/posts/:id',
        '/blog/tags/:id',
      ], value));
    });

    const values_ = [
      '/',
      '/posts/140',
      '/blog/posts/140',
      '/tag/140',
      '/blog/tags/140',
    ];

    const valueNode = values_.map(value => OnesyUtils.matchRoute([
      '/',
      '/blog/posts/:id',
      '/blog/tags/:id',
    ], value));

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
      false,
      true,
      false,
      true,
    ]));
  });

});
