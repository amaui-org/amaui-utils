/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/is', () => {

  post(() => reset());

  group('Intl', () => {

    to('is Intl', async () => {
      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isExists('Intl'),);
      const valueNode = AmauiUtils.isExists('Intl');
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(true));
    });

  });

});
