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

      to('Caret positioning', async () => {
        const valueBrowsers = await evaluate((window: any) => {
          window.AmauiUtils.polyfills();

          const p: HTMLParagraphElement = window.document.createElement('p');

          p.contentEditable = 'true';
          p.textContent = 'a';

          window.document.body.append(p);

          p.focus();

          window.document.execCommand('selectAll', false, null);
          window.document.getSelection().collapseToEnd();

          // Save caret position
          let save = window.AmauiUtils.CaretPositioning.save(p);
          let position = window.document.getSelection();

          const result = [
            window.AmauiUtils.equalDeep(save, { start: 1, end: 1 }) &&
            (position.anchorNode.parentElement === p || position.anchorNode === p) &&
            position.anchorOffset === 1
          ];

          // Restore caret position
          window.AmauiUtils.CaretPositioning.restore(p, { start: 0, end: 0 });

          // Save caret position again
          save = window.AmauiUtils.CaretPositioning.save(p);
          position = window.document.getSelection();

          result.push(
            window.AmauiUtils.equalDeep(save, { start: 0, end: 0 }) &&
            (position.anchorNode.parentElement === p || position.anchorNode === p) &&
            position.anchorOffset === 0
          );

          return result;
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
