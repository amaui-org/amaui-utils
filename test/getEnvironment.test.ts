/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getEnvironment', () => {

  post(() => reset());

  to('getEnvironment', async () => {
    const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.getEnvironment() === window,);
    const valueNode = AmauiUtils.getEnvironment() === global;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(true));
  });

});
