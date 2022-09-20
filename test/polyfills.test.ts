/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/polyfills', () => {

  post(() => reset());

  preTo(reset);

  to('additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.polyfills(true), ('a' as any).alpha instanceof Function,
      ].filter(Boolean);

      return values_;
    });

    const values_ = [
      AmauiUtils.polyfills(true), ('a' as any).alpha instanceof Function,
    ].filter(Boolean);

    const valueNode = values_;

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      true,
    ]));
  });

  group('polyfills', () => {

    group('browser', () => {

      preTo(reset);

      to('ArrayBuffer', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.AMAUI = { env: 'test' };

          window.AmauiUtils.polyfills();

          return [
            File.prototype.arrayBuffer.toString().indexOf('native code') === -1,
            Blob.prototype.arrayBuffer.toString().indexOf('native code') === -1,
          ];
        });
        const values = [...valueBrowsers];

        values.forEach(value => assert(value).eql([
          true,
          true,
        ]));
      });

    });

  });

});
