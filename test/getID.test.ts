/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/getID', () => {

  post(() => reset());

  to('getID', async () => {
    const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.getID(),);
    const valueNode = OnesyUtils.getID();
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      assert(value).to.be.a('string');
      assert(value.length).eq(36);
    });
  });

});
