/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';
import path from 'path';

import { evaluate, reset, utils } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/equalDeep', () => {

  post(() => reset());

  to('string', async () => {
    const values_ = [
      AmauiUtils.equalDeep('a4', 'a4'),
      !AmauiUtils.equalDeep('a', 'a4'),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.equalDeep('a4', 'a4'),
        !window.AmauiUtils.equalDeep('a', 'a4'),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('number', async () => {
    const values_ = [
      AmauiUtils.equalDeep(4, 4),
      AmauiUtils.equalDeep(NaN, NaN),
      !AmauiUtils.equalDeep(1, 4),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.equalDeep(4, 4),
        window.AmauiUtils.equalDeep(NaN, NaN),
        !window.AmauiUtils.equalDeep(1, 4),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(3).fill(true)));
  });

  to('boolean', async () => {
    const values_ = [
      AmauiUtils.equalDeep(true, true),
      !AmauiUtils.equalDeep(false, true),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        window.AmauiUtils.equalDeep(true, true),
        !window.AmauiUtils.equalDeep(false, true),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('array', async () => {
    const a = function a() { };
    const a1 = function a1() { };

    const values_ = [
      AmauiUtils.equalDeep([1, 4, a], [1, 4, a]),
      !AmauiUtils.equalDeep([1, 4, a1], [1, 4, a]),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const a = function a() { };
      const a1 = function a1() { };

      const values_ = [
        window.AmauiUtils.equalDeep([1, 4, a], [1, 4, a]),
        !window.AmauiUtils.equalDeep([1, 4, a1], [1, 4, a]),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('object', async () => {
    const a = function a() { };
    const a1 = function a1() { };
    const m = new Map();

    const values_ = [
      AmauiUtils.equalDeep({ a: 4, ab: { a: m } }, { a: 4, ab: { a: m } }),
      !AmauiUtils.equalDeep({ a: 4, ad: a, ab: { a: new Map() } }, { a: 4, ad: a1, ab: { a: new Map() } }),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const a = function a() { };
      const a1 = function a1() { };
      const m = new Map();

      const values_ = [
        window.AmauiUtils.equalDeep({ a: 4, ab: { a: m } }, { a: 4, ab: { a: m } }),
        !window.AmauiUtils.equalDeep({ a: 4, ad: a, ab: { a: m } }, { a: 4, ad: a1, ab: { a: m } }),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('file', async () => {
    const valueBrowsers: any[] = [];
    const filePath = path.resolve(__dirname, '../size-snapshot.json');
    const filePath1 = path.resolve(__dirname, '../package.json');

    for (const [index, name] of Object.keys(utils.browsers).entries()) {
      const browser = utils.browsers[name];

      // Note that Promise.all prevents a race condition
      // between clicking and waiting for the file chooser.
      const [_, fileChooser] = await Promise.all([
        // Add the input element
        evaluate((window: any) => {
          const input = window.document.createElement('input');

          input.type = 'file';
          input.multiple = true;
          input.id = 'a';

          if (!window.document.getElementById('a')) window.document.body.appendChild(input);
        }, { browsers: { [name]: browser } }),

        // It is important to call waitForEvent before click to set up waiting.
        browser.page.waitForEvent('filechooser'),

        // Opens the file chooser.
        browser.page.locator('#a').click(),
      ]);

      await fileChooser.setFiles([filePath, filePath1]);

      const valueBrowser = await evaluate(async (window: any) => {
        const input = window.document.getElementById('a') as HTMLInputElement;
        const [file, file1] = input.files;

        return [
          file === file,
          file !== file1,
        ];
      }, { browsers: { [name]: browser } });

      valueBrowsers[index] = valueBrowser[0];
    }

    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('blob', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const a = new Blob([new ArrayBuffer(4)]);
      const a1 = new Blob([new ArrayBuffer(41)]);

      const values_ = [
        window.AmauiUtils.equalDeep(a, a),
        window.AmauiUtils.equalDeep(a1, a),
      ];

      return values_;
    });
    const values = [...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('function', async () => {
    const a = function a() { };
    const a1 = function a1() { };

    const values_ = [
      AmauiUtils.equalDeep(a, a),
      !AmauiUtils.equalDeep(a1, a),
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const a = function a() { };
      const a1 = function a1() { };

      const values_ = [
        window.AmauiUtils.equalDeep(a, a),
        !window.AmauiUtils.equalDeep(a1, a),
      ];

      return values_;
    });
    const valueNode = values_;
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(new Array(2).fill(true)));
  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      window.AmauiUtils.polyfills();

      const input = window.document.getElementById('a') as HTMLInputElement;

      const file = input.files[0];

      const a = function a() { };
      const b = new Blob([new ArrayBuffer(4)]);

      return [
        ('a' as any).equalDeep('a'),
        (4 as any).equalDeep(4),
        (true as any).equalDeep(true),
        ([] as any).equalDeep([]),
        ({} as any).equalDeep({}),
        (file as any).equalDeep(file),
        (b as any).equalDeep(b),
        (a as any).equalDeep(a),
      ].every(item => item === true);
    });

    AmauiUtils.polyfills();

    const a = function a() { };

    const valueNode = [
      ('a' as any).equalDeep('a'),
      (4 as any).equalDeep(4),
      (true as any).equalDeep(true),
      ([] as any).equalDeep([]),
      ({} as any).equalDeep({}),
      (a as any).equalDeep(a),
    ].every(item => item === true);

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql(true));
  });

});
