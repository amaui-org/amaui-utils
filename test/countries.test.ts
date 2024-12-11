/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/countries', () => {

  post(() => reset());

  to('Serbia', async () => {
    const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.countries.find(country => country['alpha-2'] === 'RS'),);
    const valueNode = OnesyUtils.countries.find(country => country['alpha-2'] === 'RS');
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql({
      'flag': '🇷🇸',
      'name': 'Serbia',
      'full_name': 'The Republic of Serbia',
      'sovereignty': 'UN member state',
      'alpha-2': 'RS',
      'alpha-3': 'SRB',
      'numeric': '688',
      'subdivision': 'ISO 3166-2:RS',
      'tlds': [
        'rs'
      ],
    }));
  });

});
