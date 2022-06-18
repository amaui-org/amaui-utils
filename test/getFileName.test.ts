/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import path from 'path';

import { evaluate, reset, utils } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getFileName', () => {

  pre(async () => {
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
    }
  });

  post(() => reset());

  to('getFileName', async () => {
    for (const name of Object.keys(utils.browsers)) {
      const browser = utils.browsers[name];

      const valueBrowser = await evaluate(async (window: any) => {
        const input = window.document.getElementById('a') as HTMLInputElement;
        const file = input.files[0];

        const values = [
          window.AmauiUtils.getFileName(file),
        ];

        return values;
      }, { browsers: { [name]: browser } });

      assert(valueBrowser[0]).eql([
        'Size snapshot',
      ]);
    }
  });

  group('options', () => {

    to('prefix', async () => {
      for (const name of Object.keys(utils.browsers)) {
        const browser = utils.browsers[name];

        const valueBrowser = await evaluate(async (window: any) => {
          const input = window.document.getElementById('a') as HTMLInputElement;
          const file = input.files[0];

          const values = [
            window.AmauiUtils.getFileName(file, { prefix: 'a' }),
          ];

          return values;
        }, { browsers: { [name]: browser } });

        assert(valueBrowser[0]).eql([
          'aSize snapshot',
        ]);
      }
    });

    to('sufix', async () => {
      for (const name of Object.keys(utils.browsers)) {
        const browser = utils.browsers[name];

        const valueBrowser = await evaluate(async (window: any) => {
          const input = window.document.getElementById('a') as HTMLInputElement;
          const file = input.files[0];

          const values = [
            window.AmauiUtils.getFileName(file, { sufix: 'a' }),
          ];

          return values;
        }, { browsers: { [name]: browser } });

        assert(valueBrowser[0]).eql([
          'Size snapshota',
        ]);
      }
    });

    to('clean', async () => {
      for (const name of Object.keys(utils.browsers)) {
        const browser = utils.browsers[name];

        const valueBrowser = await evaluate(async (window: any) => {
          const input = window.document.getElementById('a') as HTMLInputElement;
          const file = input.files[0];

          const values = [
            window.AmauiUtils.getFileName(file, { clean: true }),
            window.AmauiUtils.getFileName(file, { clean: false }),
          ];

          return values;
        }, { browsers: { [name]: browser } });

        assert(valueBrowser[0]).eql([
          'Size snapshot',
          'Size-snapshot',
        ]);
      }
    });

    to('capitalize', async () => {
      for (const name of Object.keys(utils.browsers)) {
        const browser = utils.browsers[name];

        const valueBrowser = await evaluate(async (window: any) => {
          const input = window.document.getElementById('a') as HTMLInputElement;
          const file = input.files[0];

          const values = [
            window.AmauiUtils.getFileName(file, { capitalize: true }),
            window.AmauiUtils.getFileName(file, { capitalize: false }),
          ];

          return values;
        }, { browsers: { [name]: browser } });

        assert(valueBrowser[0]).eql([
          'Size snapshot',
          'size snapshot',
        ]);
      }
    });

    to('withExt', async () => {
      for (const name of Object.keys(utils.browsers)) {
        const browser = utils.browsers[name];

        const valueBrowser = await evaluate(async (window: any) => {
          const input = window.document.getElementById('a') as HTMLInputElement;
          const file = input.files[0];

          const values = [
            window.AmauiUtils.getFileName(file, { withExt: true }),
            window.AmauiUtils.getFileName(file, { withExt: false }),
          ];

          return values;
        }, { browsers: { [name]: browser } });

        assert(valueBrowser[0]).eql([
          'Size snapshot.json',
          'Size snapshot',
        ]);
      }
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      const input = window.document.getElementById('a') as HTMLInputElement;
      const file = input.files[0];

      return [
        (file as any).getName(),
      ];
    });

    AmauiUtils.polyfills();

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'Size snapshot',
    ]));
  });

});
