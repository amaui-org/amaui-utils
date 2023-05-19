/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { evaluate, reset } from '../utils/js/test/utils';

import * as AmauiUtils from '../src';

group('@amaui/utils/pagination', () => {

  post(() => reset());

  to('pagination', async () => {
    const valueBrowsers = await evaluate((window: any) => {
      const values_ = [
        [14, 140, 4, 1]
      ].map(item => window.AmauiUtils.pagination(...item));

      return values_;
    });

    const valueNode = [
      [14, 140, 4, 1]
    ].map((item: [number, number, number, number]) => AmauiUtils.pagination(...item));

    const values = [...valueNode, ...valueBrowsers];

    values.forEach(value => assert(value).eql([
      [1, 2, 3, 4, '...', 13, 14, 15, '...', 137, 138, 139, 140]
    ]));
  });

});
