/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

declare const WorkerGlobalScope: any;

import { evaluate, reset, evaluateWorker, utils } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/isEnvironment', () => {

  post(() => reset());

  group('browser', () => {

    to('is browser', async () => {
      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('browser'),);

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not browser', async () => {
      const valueNode = AmauiUtils.isEnvironment('browser');

      assert(valueNode).eq(false);
    });

  });

  group('worker', () => {

    to('is worker', async () => {
      const valueWorkers = await evaluateWorker(() => typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope, { browsers: { chromium: utils.browsers.chromium } });

      valueWorkers.forEach(value => assert(value).eq(true));
    });

    to('is not worker', async () => {
      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('worker'),);
      const valueNode = AmauiUtils.isEnvironment('worker');
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(false));
    });

  });

  group('nodejs', () => {

    to('is nodejs', async () => {
      const valueNode = AmauiUtils.isEnvironment('nodejs');

      assert(valueNode).eq(true);
    });

    to('is not nodejs', async () => {
      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('nodejs'));

      valueBrowsers.forEach(value => assert(value).eq(false));
    });

  });

  group('localhost', () => {

    // We have no browsers localhost app atm
    // while playwright testing so we will use a dummy input
    // to the is method
    to('is localhost', async () => {
      const valueBrowsers = await evaluate((window: any) => window.AmauiUtils.isEnvironment('localhost', 'localhost'),);

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not localhost', async () => {
      const valueNode = AmauiUtils.isEnvironment('localhost');

      assert(valueNode).eq(false);
    });

  });

});
