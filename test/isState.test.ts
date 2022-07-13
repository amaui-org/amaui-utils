/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import playwright from 'playwright';

import { evaluate, startBrowser, IBrowser, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/isState', () => {

  post(() => reset());

  group('online', () => {

    to('is online', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['iPhone 13 Pro'] } });

      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isState('online'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not online', async () => {
      const valueNode = AmauiUtils.isState('online');

      assert(valueNode).eq(false);
    });

  });

  group('offline', () => {

    to('is offline', async () => {
      const browser: IBrowser = await startBrowser('chromium');

      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isState('offline'), {
        browsers: { chromium: browser },
        preEvaluate: async browser => await browser.context.setOffline(true),
        postEvaluate: async browser => await browser.context.setOffline(false),
      });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not offline', async () => {
      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isState('offline'),);
      const valueNode = AmauiUtils.isState('offline');
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(false));
    });

  });

});
