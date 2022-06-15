/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getStringVariables', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('getStringVariables', async () => {
    const values_ = [
      [`'a' DD "a" MM \`a\` YYYY {a} [a]`],
      [''],
      [true],
      [null],
      [undefined],
      [new Array()],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`],
        [''],
        [true],
        [null],
        [undefined],
        [new Array()],
      ];

      return values_.map((value: [any, any]) => window.AmauiUtils.getStringVariables(...value));
    }, { browsers });
    const valueNode = values_.map((value: [any, any]) => AmauiUtils.getStringVariables(...value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
        variables: [
          'a',
          'a'
        ],
        valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY _0 _1"
      },
      {
        value: '',
        variables: [],
        valueWithPlaceholders: ''
      },
      ...new Array(4).fill(undefined),
    ]));
  });

  group('options', () => {

    to('variablesRegExp', async () => {
      const values_ = [
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`],
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { variablesRegExp: /(\+.*?\+)/g }],
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { variablesRegExp: /(\[.*?\])/g }],
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { variablesRegExp: /('.*?'|".*?"|`.*?`|\{.*?\}|\[.*?\])/g }],
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`],
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { variablesRegExp: /(\+.*?\+)/g }],
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { variablesRegExp: /(\[.*?\])/g }],
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { variablesRegExp: /('.*?'|".*?"|`.*?`|\{.*?\}|\[.*?\])/g }],
        ];

        return values_.map((value: [any, any]) => window.AmauiUtils.getStringVariables(...value));
      }, { browsers });
      const valueNode = values_.map((value: [any, any]) => AmauiUtils.getStringVariables(...value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [
            'a',
            'a',
          ],
          valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY _0 _1"
        },
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [],
          valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY {a} [a]"
        },
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [
            'a',
          ],
          valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY {a} _0"
        },
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [
            'a',
            'a',
            'a',
            'a',
            'a',
          ],
          valueWithPlaceholders: "_0 DD _1 MM _2 YYYY _3 _4"
        },
      ]));
    });

    to('cleanVariables', async () => {
      const values_ = [
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { cleanVariables: true }],
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { cleanVariables: false }],
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { cleanVariables: true }],
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { cleanVariables: false }],
        ];

        return values_.map((value: [any, any]) => window.AmauiUtils.getStringVariables(...value));
      }, { browsers });
      const valueNode = values_.map((value: [any, any]) => AmauiUtils.getStringVariables(...value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [
            'a',
            'a',
          ],
          valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY _0 _1"
        },
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [
            '{a}',
            '[a]',
          ],
          valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY _0 _1"
        },
      ]));
    });

    to('placeholderPrefix', async () => {
      const values_ = [
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`],
        [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { placeholderPrefix: ',' }],
      ];

      const valueBrowsers = await evaluate((window: any) => {
        const values_ = [
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`],
          [`'a' DD "a" MM \`a\` YYYY {a} [a]`, { placeholderPrefix: ',' }],
        ];

        return values_.map((value: [any, any]) => window.AmauiUtils.getStringVariables(...value));
      }, { browsers });
      const valueNode = values_.map((value: [any, any]) => AmauiUtils.getStringVariables(...value));
      const values = [valueNode, ...valueBrowsers];

      values.forEach(value => assert(value).eql([
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [
            'a',
            'a',
          ],
          valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY _0 _1"
        },
        {
          value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
          variables: [
            'a',
            'a',
          ],
          valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY ,0 ,1"
        },
      ]));
    });

  });

  to('with polyfills additions', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      window.AmauiUtils.polyfills();

      return [
        (`'a' DD "a" MM \`a\` YYYY {a} [a]` as any).getVariables(),
      ];
    }, { browsers });

    AmauiUtils.polyfills();

    const valueNode = [
      (`'a' DD "a" MM \`a\` YYYY {a} [a]` as any).getVariables(),
    ];

    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      {
        value: "'a' DD \"a\" MM `a` YYYY {a} [a]",
        variables: [
          'a',
          'a'
        ],
        valueWithPlaceholders: "'a' DD \"a\" MM `a` YYYY _0 _1"
      },
    ]));
  });

});
