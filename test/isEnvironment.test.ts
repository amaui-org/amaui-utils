/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

declare const WorkerGlobalScope: any;

import { evaluate, reset, evaluateWorker, utils } from '../utils/js/test/utils';

import * as OnesyUtils from '../src';

group('@onesy/utils/isEnvironment', () => {

  post(() => reset());

  group('browser', () => {

    to('is browser', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isEnvironment('browser'),);

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not browser', async () => {
      const valueNode = OnesyUtils.isEnvironment('browser');

      assert(valueNode).eq(false);
    });

  });

  group('worker', () => {

    to('is worker', async () => {
      const valueWorkers = await evaluateWorker(() => typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope, { browsers: { chromium: utils.browsers.chromium } });

      valueWorkers.forEach(value => assert(value).eq(true));
    });

    to('is not worker', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isEnvironment('worker'),);
      const valueNode = OnesyUtils.isEnvironment('worker');
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eq(false));
    });

  });

  group('nodejs', () => {

    to('is nodejs', async () => {
      const valueNode = OnesyUtils.isEnvironment('nodejs');

      assert(valueNode).eq(true);
    });

    to('is not nodejs', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isEnvironment('nodejs'));

      valueBrowsers.forEach(value => assert(value).eq(false));
    });

  });

  group('localhost', () => {

    // We have no browsers localhost app atm
    // while playwright testing so we will use a dummy input
    // to the is method
    to('is localhost', async () => {
      const valueBrowsers = await evaluate((window: any) => window.OnesyUtils.isEnvironment('localhost', 'localhost'),);

      valueBrowsers.forEach(value => assert(value).eq(true));
    });

    to('is not localhost', async () => {
      const valueNode = OnesyUtils.isEnvironment('localhost');

      assert(valueNode).eq(false);
    });

  });

});
