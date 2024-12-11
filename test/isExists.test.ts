/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/is', () => {

  post(() => reset());

  group('Intl', () => {

    to('is Intl', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isExists('Intl'),);
      const valueNode = OnesyUtils.isExists('Intl');
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

});
