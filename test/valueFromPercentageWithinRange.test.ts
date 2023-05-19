/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/valueFromPercentageWithinRange', () => {

  post(() => reset());

  to('valueFromPercentageWithinRange', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [70, -140, 742, 0, 100]
      ].map(item => window.AmauiUtils.valueFromPercentageWithinRange(...item));

      return values_;
    });

    const valueNode = [
      [70, -140, 742, 0, 100]
    ].map((item: [number, number, number, number]) => AmauiUtils.valueFromPercentageWithinRange(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      477.4
    ]));
  });

});
