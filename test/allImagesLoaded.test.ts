/* tslint:disable: no-shadowed-variable */
import { assert } from '@onesy/test';

import { evaluate, reset } from '../utils/js/test/utils';

group('@onesy/utils/allImagesLoaded', () => {

  post(() => reset());

  to('allImagesLoaded', async () => {
    const valueBrowsers = await evaluate(async (window: any) => {
      const images: Array<HTMLImageElement> = [];

      for (const [index, _] of new Array(4).entries()) {
        const img = window.document.createElement('img');

        img.src = `https://picsum.photos/seed/${index}/440/440`;
        img.className = 'onesy';
        img.alt = '';

        window.document.body.appendChild(img);

        images.push(img);
      }

      const result = [0, 0];

      // Not load completed images
      for (const image of images) if (!image.complete) result[0]++;

      await window.OnesyUtils.allImagesLoaded();

      // Images loaded after above method
      for (const image of images) if (image.complete) result[1]++;

      return result;
    });

    valueBrowsers.forEach((value: any) => assert(value).eql([4, 4]));
  });

});
