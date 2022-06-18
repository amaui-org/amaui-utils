/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import { spy } from 'sinon';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/asyncMethodRetry', () => {

  post(() => reset());

  to('made', async () => {
    let retryCount = 3;

    const method = spy();
    const methodMain = () => new Promise(resolve => {
      method();

      if (retryCount === 0) return resolve(true);

      retryCount--;

      throw new Error();
    });

    await AmauiUtils.asyncMethodRetry(methodMain, 40);

    const valueBrowsers = await evaluate(async (window: any) => {
      let retryCount = 3;

      const method = window.sinon.spy();
      const methodMain = () => new Promise(resolve => {
        method();

        if (retryCount === 0) return resolve(true);

        retryCount--;

        throw new Error();
      });

      await window.AmauiUtils.asyncMethodRetry(methodMain, 40);

      return [method.callCount];
    });
    const valueNode = [method.callCount];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      4,
    ]));
  });

  to('retries', async () => {
    let retryCount = 4;
    let value: Error;

    const method = spy();
    const methodMain = () => new Promise(resolve => {
      method();

      if (retryCount === 0) return resolve(true);

      retryCount--;

      throw new Error();
    });

    try {
      await AmauiUtils.asyncMethodRetry(methodMain, 3);
    }
    catch (error) {
      value = error;
    }

    const valueBrowsers = await evaluate(async (window: any) => {
      let retryCount = 4;
      let value: Error;

      const method = window.sinon.spy();
      const methodMain = () => new Promise(resolve => {
        method();

        if (retryCount === 0) return resolve(true);

        retryCount--;

        throw new Error();
      });

      try {
        await window.AmauiUtils.asyncMethodRetry(methodMain, 3);
      }
      catch (error) {
        value = error;
      }

      return [
        retryCount,
        method.callCount,
        value instanceof Error,
      ];
    });
    const valueNode = [
      retryCount,
      method.callCount,
      value instanceof Error,
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      1,
      3,
      true,
    ]));
  });

  to('timeout', async () => {
    let retryCount = 3;

    const method = spy();
    const methodMain = () => new Promise(resolve => {
      method();

      if (retryCount === 0) return resolve(true);

      retryCount--;

      throw new Error();
    });

    const start = new Date().getTime();

    await AmauiUtils.asyncMethodRetry(methodMain, 4, 140);

    const valueNode = [
      new Date().getTime() - start,
      method.callCount,
    ];

    const valueBrowsers = await evaluate(async (window: any) => {
      let retryCount = 3;

      const method = window.sinon.spy();
      const methodMain = () => new Promise(resolve => {
        method();

        if (retryCount === 0) return resolve(true);

        retryCount--;

        throw new Error();
      });

      const start = new Date().getTime();

      await window.AmauiUtils.asyncMethodRetry(methodMain, 4, 140);

      return [
        new Date().getTime() - start,
        method.callCount,
      ];
    });
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => {
      assert(value[0] > 420 && value[0] < 440);
      assert(value[1]).eq(4);
    });
  });

  to('fail', async () => {
    let retryCount = 5;
    let value: Error;

    const method = spy();
    const methodMain = () => new Promise(resolve => {
      method();

      if (retryCount === 0) return resolve(true);

      retryCount--;

      throw new Error();
    });

    try {
      await AmauiUtils.asyncMethodRetry(methodMain);
    }
    catch (error) {
      value = error;
    }

    const valueBrowsers = await evaluate(async (window: any) => {
      let retryCount = 5;
      let value: Error;

      const method = window.sinon.spy();
      const methodMain = () => new Promise(resolve => {
        method();

        if (retryCount === 0) return resolve(true);

        retryCount--;

        throw new Error();
      });

      try {
        await window.AmauiUtils.asyncMethodRetry(methodMain);
      }
      catch (error) {
        value = error;
      }

      return [
        method.callCount,
        value instanceof Error,
      ];
    });
    const valueNode = [
      method.callCount,
      value instanceof Error,
    ];
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      4,
      true,
    ]));
  });

});
