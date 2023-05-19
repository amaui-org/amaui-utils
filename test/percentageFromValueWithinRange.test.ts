/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/percentageFromValueWithinRange', () => {

  post(() => reset());

  to('percentageFromValueWithinRange', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [140, -114, 214, 0, 100]
      ].map(item => window.AmauiUtils.percentageFromValueWithinRange(...item));

      return values_;
    });

    const valueNode = [
      [140, -114, 214, 0, 100]
    ].map((item: [number, number, number, number]) => AmauiUtils.percentageFromValueWithinRange(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      77.4390243902439
    ]));
  });

});
