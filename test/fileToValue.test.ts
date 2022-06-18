/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import AmauiNode from '@amaui/node';
import path from 'path';

import { evaluate, reset, utils } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/fileToValue', () => {

  post(() => reset());

  to('fileToValue', async () => {
    for (const name of Object.keys(utils.browsers)) {
      const browser = utils.browsers[name];

      // Note that Promise.all prevents a race condition
      // between clicking and waiting for the file chooser.
      const [_, fileChooser] = await Promise.all([
        // Add the input element
        evaluate((window: any) => {
          const input = window.document.createElement('input');

          input.type = 'file';
          input.id = 'a';

          if (!window.document.getElementById('a')) window.document.body.appendChild(input);
        }, { browsers: { [name]: browser } }),
        // It is important to call waitForEvent before click to set up waiting.
        browser.page.waitForEvent('filechooser'),
        // Opens the file chooser.
        browser.page.locator('#a').click(),
      ]);

      const filePath = path.resolve(__dirname, '../size-snapshot.json');

      await fileChooser.setFiles(filePath);

      const valueBrowser = await evaluate(async (window: any) => {
        const input = window.document.getElementById('a') as HTMLInputElement;
        const file = input.files[0];

        const values = [
          await window.AmauiUtils.fileToValue(file, 'text'),
          (await window.AmauiUtils.fileToValue(file, 'binary') as string).length,
          (await window.AmauiUtils.fileToValue(file, 'array-buffer') as ArrayBuffer).byteLength,
          await window.AmauiUtils.fileToValue(file, 'datauri'),
        ];

        return values;
      }, { browsers: { [name]: browser } });

      const fileValue = await AmauiNode.file.get(filePath) as string;

      assert(valueBrowser[0]).eql([
        fileValue,
        fileValue.length,
        fileValue.length,
        AmauiUtils.to(fileValue, 'datauri', { mime: 'application/json' }),
      ]);
    }
  });

  to('with polyfills additions', async () => {
    const filePath = path.resolve(__dirname, '../size-snapshot.json');

    const valueBrowsers = await evaluate(async (window: any) => {
      window.AmauiUtils.polyfills();

      const input = window.document.getElementById('a') as HTMLInputElement;
      const file = input.files[0];

      return await (file as any).toValue('text');
    });

    AmauiUtils.polyfills();

    const values = [...valueBrowsers];

    const fileValue = await AmauiNode.file.get(filePath) as string;

    values.forEach(value => assert(value === fileValue).eq(true));
  });

});
