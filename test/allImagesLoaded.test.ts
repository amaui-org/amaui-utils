/* tslint:disable: no-shadowed-variable */
import { assert } from '@amaui/test';

import { startBrowsers, IBrowsers, evaluate, closeBrowsers, reset } from '../utils/js/test/utils';

group('@amaui/utils/allImagesLoaded', () => {
  let browsers: IBrowsers;

  pre(async () => browsers = await startBrowsers());

  post(async () => {
    await closeBrowsers(browsers);

    reset();
  });

  to('allImagesLoaded', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const images: Array<HTMLImageElement> = [];

      for (const [index, _] of new Array(4).entries()) {
        const img = window.document.createElement('img');

        img.src = `https://picsum.photos/seed/${index}/440/440`;
        img.className = 'amaui';
        img.alt = '';

        window.document.body.appendChild(img);

        images.push(img);
      }

      const result = [0, 0];

      // Not load completed images
      for (const image of images) if (!image.complete) result[0]++;

      await window.AmauiUtils.allImagesLoaded();

      // Images loaded after above method
      for (const image of images) if (image.complete) result[1]++;

      return result;
    }, { browsers });

    valueBrowsers.forEach((value: any) => assert(value).eql([4, 4]));
  });

});
