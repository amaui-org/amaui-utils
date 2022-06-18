/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/getGoogleFontsURL', () => {

  post(() => reset());

  to('getGoogleFontsURL', async () => {
    const values_ = [
      [
        { name: 'Roboto' },
      ],
      [
        { name: 'Roboto', weights: [400] },
      ],
      [
        { name: 'Source Sans 3', weights: ['italic 200', 400, 700] },
      ],
      [
        { name: 'Roboto', weights: [400, 700] },
        { name: 'Source Sans 3', weights: ['italic 200', 400, 700] },
      ],
    ];

    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [
          { name: 'Roboto' },
        ],
        [
          { name: 'Roboto', weights: [400] },
        ],
        [
          { name: 'Source Sans 3', weights: ['italic 200', 400, 700] },
        ],
        [
          { name: 'Roboto', weights: [400, 700] },
          { name: 'Source Sans 3', weights: ['italic 200', 400, 700] },
        ],
      ];

      return values_.map((value: any) => window.AmauiUtils.getGoogleFontsURL(value));
    });
    const valueNode = values_.map((value: any) => AmauiUtils.getGoogleFontsURL(value));
    const values = [valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400&display=swap',
      'https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,400;0,700;1,200&display=swap',
      'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Source+Sans+3:ital,wght@0,400;0,700;1,200&display=swap',
    ]));
  });

});
