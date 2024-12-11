/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import playwright from 'playwright';

import { evaluate, startBrowser, IBrowser, reset, utils } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/isOS', () => {

  post(() => reset());

  group('mobile', () => {

    to('is mobile', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isOS('mobile'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not mobile', async () => {
      const valueNode = OnesyUtils.isOS('mobile');

      assert(valueNode).eq(false);
    });

  });

  group('mac', () => {

    to('is mac', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isOS('mac'), { browsers: { webkit: utils.browsers.webkit } });

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not mac', async () => {
      const valueNode = OnesyUtils.isOS('mac');

      assert(valueNode).eq(false);
    });

  });

  group('android', () => {

    to('is android', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isOS('android'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not android', async () => {
      const valueNode = OnesyUtils.isOS('android');

      assert(valueNode).eq(false);
    });

  });

  group('ios', () => {

    to('is ios', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['iPhone 13 Pro'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isOS('ios'), { browsers: { webkit: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not ios', async () => {
      const valueNode = OnesyUtils.isOS('ios');

      assert(valueNode).eq(false);
    });

  });

  group('windows', () => {

    to('is windows', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Edge'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isOS('windows'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not windows', async () => {
      const valueNode = OnesyUtils.isOS('windows');

      assert(valueNode).eq(false);
    });

  });

  group('linux', () => {

    to('is linux', async () => {
      const browser: IBrowser = await startBrowser('chromium', {
        context: {
          ...playwright.devices['Desktop Chrome'],
          userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.54 Safari/537.36',
        },
      });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isOS('linux'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not linux', async () => {
      const valueNode = OnesyUtils.isOS('linux');

      assert(valueNode).eq(false);
    });

  });

});
