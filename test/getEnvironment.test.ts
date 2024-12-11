/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/getEnvironment', () => {

  post(() => reset());

  to('getEnvironment', async () => {
    const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.getEnvironment() === window,);
    const valueNode = OnesyUtils.getEnvironment() === global;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eq(true));
  });

});
