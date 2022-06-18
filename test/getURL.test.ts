/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getURL', () => {

  post(() => reset());

  to('getURL', async () => {
    const values_ = [
      'a.com',
      'www.a.com',
      'http://a.com',
      'https://a.com/a',
      'https://a.com/a?a=a4',
      'https://www.a.com/a?a=a4',
      '/',
      '/a',
      '/a?a=a4',
      '/a/a?a=a4',
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        'a.com',
        'www.a.com',
        'http://a.com',
        'https://a.com/a',
        'https://a.com/a?a=a4',
        'https://www.a.com/a?a=a4',
        '/',
        '/a',
        '/a?a=a4',
        '/a/a?a=a4',
      ];

      return values_.map(value => window.AmauiUtils.getURL(value));
    });
    const valueNode = values_.map(value => AmauiUtils.getURL(value));

    assert(valueNode).eql([
      '',
      '',
      'http://a.com',
      'https://a.com/a',
      'https://a.com/a?a=a4',
      'https://www.a.com/a?a=a4',
      'https://localhost',
      'https://localhost/a',
      'https://localhost/a?a=a4',
      'https://localhost/a/a?a=a4',
    ]);

    valueBrowsers.forEach(value => assert(value).eql([
      '',
      '',
      'http://a.com',
      'https://a.com/a',
      'https://a.com/a?a=a4',
      'https://www.a.com/a?a=a4',
      'http://localhost:4000?q=a&a=4',
      'http://localhost:4000/a?q=a&a=4',
      'http://localhost:4000/a?a=a4',
      'http://localhost:4000/a/a?a=a4',
    ]));
  });

  group('options', () => {

    to('URL', async () => {
      const valueBrowsers = await evaluate((window: any) => [
        window.AmauiUtils.getURL('http://a.com/a?a=a4', { URL: true }) instanceof URL,
        window.AmauiUtils.getURL('http://a.com/a?a=a4', { URL: false }),
      ]);
      const valueNode = [
        AmauiUtils.getURL('http://a.com/a?a=a4', { URL: true }) instanceof URL,
        AmauiUtils.getURL('http://a.com/a?a=a4', { URL: false }),
      ];
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        true,
        'http://a.com/a?a=a4',
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        ('http://a.com' as any).getURL(),
      ];
    });

    AmauiUtils.polyfills();

    const valueNode = [
      ('http://a.com' as any).getURL(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'http://a.com',
    ]));
  });

});
