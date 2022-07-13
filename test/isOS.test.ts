/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import playwright from 'playwright';

import { evaluate, startBrowser, IBrowser, reset, utils } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/isOS', () => {

  post(() => reset());

  group('mobile', () => {

    to('is mobile', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('mobile'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not mobile', async () => {
      const valueNode = AmauiUtils.isOS('mobile');

      assert(valueNode).eq(false);
    });

  });

  group('mac', () => {

    to('is mac', async () => {
      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('mac'), { browsers: { webkit: utils.browsers.webkit } });

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not mac', async () => {
      const valueNode = AmauiUtils.isOS('mac');

      assert(valueNode).eq(false);
    });

  });

  group('android', () => {

    to('is android', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('android'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not android', async () => {
      const valueNode = AmauiUtils.isOS('android');

      assert(valueNode).eq(false);
    });

  });

  group('ios', () => {

    to('is ios', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['iPhone 13 Pro'] } });

      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('ios'), { browsers: { webkit: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not ios', async () => {
      const valueNode = AmauiUtils.isOS('ios');

      assert(valueNode).eq(false);
    });

  });

  group('windows', () => {

    to('is windows', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Edge'] } });

      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('windows'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not windows', async () => {
      const valueNode = AmauiUtils.isOS('windows');

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

      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isOS('linux'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not linux', async () => {
      const valueNode = AmauiUtils.isOS('linux');

      assert(valueNode).eq(false);
    });

  });

});
