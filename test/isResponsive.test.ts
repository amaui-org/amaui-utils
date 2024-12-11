/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import playwright from 'playwright';

import { evaluate, startBrowser, IBrowser, reset } from '../utils/js/test/utils';

group('@onesy/utils/isResponsive', () => {

  post(() => reset());

  group('mobile', () => {
    let browser: IBrowser;

    postTo(async () => await browser.browser.close());

    to('is mobile', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Pixel 4'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('mobile'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not mobile', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('mobile'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(false));
    });

  });

  group('tablet', () => {
    let browser: IBrowser;

    postTo(async () => await browser.browser.close());

    to('is tablet', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['iPad Pro 11'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('tablet'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not tablet', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('tablet'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(false));
    });

  });

  group('laptop', () => {
    let browser: IBrowser;

    postTo(async () => await browser.browser.close());

    to('is laptop', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome HiDPI'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('laptop'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not laptop', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['iPad Pro 11'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('laptop'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(false));
    });

  });

  group('desktop', () => {
    let browser: IBrowser;

    postTo(async () => await browser.browser.close());

    to('is desktop', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'], viewport: { width: 1920, height: 1024 } } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('desktop'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not desktop', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome HiDPI'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('desktop'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(false));
    });

  });

  group('tv', () => {
    let browser: IBrowser;

    postTo(async () => await browser.browser.close());

    to('is tv', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'], viewport: { width: 4400, height: 4400 } } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('tv'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not tv', async () => {
      browser = await startBrowser('chromium', { context: { ...playwright.devices['Desktop Chrome'] } });

      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isResponsive('tv'), { browsers: { chromium: browser } });

      valueBrowsers.forEach(value => assert(value).eq(false));
    });

  });

});
