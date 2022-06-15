import { isEnvironment } from './is';

const allImagesLoaded = (): Promise<boolean | number> | boolean => {
  if (isEnvironment('browser')) {
    return new Promise(resolve => {
      try {
        const images = window.document.getElementsByTagName('img');
        const imagesTotal = images.length;

        let loaded = 0;
        const pending = [];

        if (!imagesTotal) return resolve(loaded);

        const check = () => {
          if (
            imagesTotal === loaded &&
            !pending.length
          ) return resolve(loaded);

          pending.forEach((image, index) => {
            if (image.complete && image.naturalWidth !== 0) pending.splice(index, 1);
          });

          setTimeout(check, 40);
        };

        const onLoad = (event: Event): any => {
          loaded += 1;

          if (
            !(event.target as HTMLImageElement).complete ||
            (event.target as HTMLImageElement).naturalWidth === 0
          ) pending.push(event.target);

          check();
        };

        const onError = (): any => {
          loaded += 1;
        };

        for (const image of images) {
          if (image.complete) onLoad({ target: image } as any);
          else {
            image.onload = onLoad;
            image.onerror = onError;
          }
        }
      }
      catch (error) {
        console.error(`Images loaded: ${error}`);

        resolve(false);
      }
    });
  }

  return false;
};

export default allImagesLoaded;
