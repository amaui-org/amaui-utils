/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import playwright from 'playwright';

import { evaluate, startBrowser, IBrowser, reset } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/is', () => {

  post(() => reset());

  group('chrome', () => {

    to('is chrome', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isBrowser('chrome'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not chrome', async () => {
      const valueNode = OnesyUtils.isBrowser('chrome');

      assert(valueNode).eq(false);
    });

  });

  group('opera', () => {

    to('is opera', async () => {
      const browser: IBrowser = await startBrowser('chromium', {
        context: {
          ...playwright.devices['Desktop Chrome'],
          userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36 OPR/81.0.4196.60',
        },
      });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isBrowser('opera'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not opera', async () => {
      const valueNode = OnesyUtils.isBrowser('opera');

      assert(valueNode).eq(false);
    });

  });

  group('firefox', () => {

    to('is firefox', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Firefox'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isBrowser('firefox'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not firefox', async () => {
      const valueNode = OnesyUtils.isBrowser('firefox');

      assert(valueNode).eq(false);
    });

  });

  group('safari', () => {

    to('is safari', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Safari'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isBrowser('safari'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not safari', async () => {
      const valueNode = OnesyUtils.isBrowser('safari');

      assert(valueNode).eq(false);
    });

  });

  group('edge-chromium', () => {

    to('is edge-chromium', async () => {
      const browser: IBrowser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Edge'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isBrowser('edge-chromium'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not edge-chromium', async () => {
      const valueNode = OnesyUtils.isBrowser('edge-chromium');

      assert(valueNode).eq(false);
    });

  });

  group('edge', () => {

    to('is edge', async () => {
      const browser: IBrowser = await startBrowser('chromium', {
        context: {
          ...playwright.devices['Desktop Edge'],
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34',
        },
      });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isBrowser('edge'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not edge', async () => {
      const valueNode = OnesyUtils.isBrowser('edge');

      assert(valueNode).eq(false);
    });

  });

  group('ie', () => {

    to('is ie', async () => {
      const browser: IBrowser = await startBrowser('chromium', {
        context: {
          ...playwright.devices['Desktop Edge'],
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.55 Safari/537.36 Edg/96.0.1054.34',
        },
      });

      const valueBrowsers = await evaluate((window: any) => {
        // IE dummy data fixture
        window.document.documentMode = 7;

        return window.OnesyUtils.isBrowser('ie');
      }, { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));

      await browser.browser.close();
    });

    to('is not ie', async () => {
      const valueNode = OnesyUtils.isBrowser('ie');

      assert(valueNode).eq(false);
    });

  });

});
