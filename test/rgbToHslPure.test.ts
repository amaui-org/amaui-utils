/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/rgbToHslPure', () => {

  post(() => reset());

  to('rgbToHslPure', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [174, 214, 224]
      ].map(item => window.AmauiUtils.rgbToHslPure(...item));

      return values_;
    });

    const valueNode = [
      [174, 214, 224]
    ].map((item: [number, number, number]) => AmauiUtils.rgbToHslPure(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [192, 45, 78]
    ]));
  });

});
