/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getCountry', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('getCountry', async () => {
    const values_ = [
      ['🇷🇸'],
      ['Serbia'],
      ['The Republic of Serbia'],
      ['UN member state', 'RS'],
      ['RS'],
      ['SRB'],
      ['688'],
      ['ISO 3166-2:RS'],
      [[
        'rs'
      ]],
      ['a'],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        ['🇷🇸'],
        ['Serbia'],
        ['The Republic of Serbia'],
        ['UN member state', 'RS'],
        ['RS'],
        ['SRB'],
        ['688'],
        ['ISO 3166-2:RS'],
        [[
          'rs'
        ]],
        ['a'],
      ];

      return values_.map((value: any) => window.AmauiUtils.getCountry(...value));
    }, { browsers });
    const valueNode = values_.map((value: any) => AmauiUtils.getCountry(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      ...new Array(9).fill({
        flag: '🇷🇸',
        name: 'Serbia',
        full_name: 'The Republic of Serbia',
        sovereignty: 'UN member state',
        'alpha-2': 'RS',
        'alpha-3': 'SRB',
        numeric: '688',
        subdivision: 'ISO 3166-2:RS',
        tlds: [
          'rs'
        ],
      }),
      undefined,
    ]));
  });

});
