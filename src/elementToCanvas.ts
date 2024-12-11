import is from './is';
import isEnvironment from './isEnvironment';
import fileToValue, { TType } from './fileToValue';
import canvasCrop from './canvasCrop';
import download from './download';
import unique from './unique';

const serialize = (node: Node) => new XMLSerializer().serializeToString(node);

const image = (uri: string): Promise<HTMLImageElement> => new Promise((resolve, reject) => {
  const img = document.createElement('img')

  const method = () => resolve(img);

  img.onload = method;

  img.onerror = () => resolve('' as any);

  img.src = uri;
});

const getData = async (url: string, version: TType = 'datauri'): Promise<any> => {
  try {
    const response = await fetch(url)

    const blob = await response.blob();

    return await fileToValue(blob, version);
  } catch (error) { }
};

export type TElementToCanvas = string | HTMLCanvasElement;

export type TElementToCanvasOptionsResponse = 'svg' | 'svg-datauri' | 'datauri' | 'canvas' | 'download';

export interface IElementToCanvasOptions {
  response?: TElementToCanvasOptionsResponse;

  x?: number;
  y?: number;

  width?: number;
  height?: number;

  image?: {
    width?: number;
    height?: number;
  };

  datauri?: {
    type?: string;
    quality?: number;
  };

  download?: {
    type?: string;
    name?: string;
    quality?: number;
  };

  filter?: Array<string>;

  crop?: { x?: number; y?: number; width?: number; height?: number; };

  styleSheets?: boolean;
  urls?: boolean;
  images?: boolean;
  links?: boolean;
}

const optionsDefault: IElementToCanvasOptions = {
  response: 'canvas',

  x: 0,
  y: 0,

  datauri: {
    type: 'image/png',
    quality: 1
  },

  download: {
    name: 'onesy-image.png',
    type: 'image/png',
    quality: 1
  },

  styleSheets: true,
  urls: true,
  images: true,
  links: true
};

const elementToCanvas = async (element_: HTMLElement, options_?: IElementToCanvasOptions): Promise<TElementToCanvas> => {
  const options = { ...optionsDefault, ...options_ };

  if (isEnvironment('browser')) {
    if (element_ !== undefined && is('element', element_)) {
      const element = element_.cloneNode(true) as HTMLElement;

      if (is('array', options.filter)) {
        options.filter.forEach(item => {
          const items = Array.from(element.querySelectorAll(item));

          items.forEach(item_ => is('function', item_.remove) && item_.remove());
        });
      }

      let elementXML = serialize(element);

      let urls = [];
      let styles = ``;
      let links = ``;
      let css = ``;

      const linksAdd = {};

      // Element urls
      if (options.urls) {
        urls = (elementXML.match(/url\((.*?)\)/gi) || []).map(item => item.replace(/url\(|'|"|\)/gi, ''));

        for (const url of unique(urls)) {
          const value = await getData(url);

          if (value) elementXML = (elementXML as any).replaceAll(url, value);
        }
      }

      // Images
      if (options.images) {
        urls = (elementXML.match(/src=("|'|`)(.*?)("|'|`)/gi) || []).map(item => item.replace(/src=|'|"||`/gi, ''));

        for (const src of unique(urls)) {
          const value = await getData(src);

          if (value) elementXML = (elementXML as any).replaceAll(src, value);
        }
      }

      // Links
      if (options.links) {
        const links_ = Array.from(window.document.querySelectorAll('link'));

        for (const link of links_) {
          if (!linksAdd[link.href] && ['stylesheet'].includes(link.rel)) {
            const value = await getData(link.href, 'text');

            if (value) {
              linksAdd[link.href] = true;

              links += `<style>${value}</style>`;
            }
          }
        }
      }

      // StyleSheets
      for (const styleSheet of window.document.styleSheets) {
        if (!styleSheet.href || styleSheet.href.startsWith(window.location.origin)) {
          for (let { cssText } of styleSheet.cssRules) css += cssText;
        }
      }

      styles = `
        <style>
          noscript {
              display: none;
          }
        </style>

        ${links}

        <style>${css}</style>
      `;

      // Styles urls
      if (options.urls) {
        urls = (styles.match(/url\((.*?)\)/gi) || []).map(item => item.replace(/url\(|'|"|\)/gi, ''));

        for (const url of unique(urls)) {
          const value = await getData(url);

          if (value) styles = (styles as any).replaceAll(url, value);
        }
      }

      const width = options.width !== undefined ? options.width : element_.offsetWidth;

      const height = options.height !== undefined ? options.height : element_.offsetHeight;

      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${options.image?.width !== undefined ? options.image?.width : width}' height='${options.image?.height !== undefined ? options.image?.height : height}'>
        ${styles}

        <foreignObject x='0' y='0' width='${options.image?.width !== undefined ? options.image?.width : width}' height='${options.image?.height !== undefined ? options.image?.height : height}'>
          ${elementXML}
        </foreignObject>
      </svg>`;

      if (options.response === 'svg') return svg;

      const uri = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;

      if (options.response === 'svg-datauri') return uri;

      const img = await image(uri);

      if (img) {
        let canvas = window.document.createElement('canvas');

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext('2d');

        context.drawImage(img, options.x, options.y, options.image?.width !== undefined ? options.image?.width : img.width, options.image?.height !== undefined ? options.image?.height : img.height);

        if (options.crop) canvas = canvasCrop(canvas, options.crop.x, options.crop.y, options.crop.width, options.crop.height);

        if (options.response === 'canvas') return canvas;

        if (options.response === 'datauri') return canvas.toDataURL(options.datauri?.type, options.datauri?.quality);

        if (options.response === 'download') {
          const value = canvas.toDataURL(options.download?.type, options.download?.quality);

          // Image
          download(options.download?.name, value);
        }
      }
    }
  }
};

export default elementToCanvas;
