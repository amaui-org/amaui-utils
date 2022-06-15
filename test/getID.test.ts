/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getID', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('getID', async () => {
    const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.getID(), { browsers });
    const valueNode = AmauiUtils.getID();
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      assert(value).to.be.a('string');
      assert(value.length).eq(36);
    });
  });

});
