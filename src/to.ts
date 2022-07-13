import is from './is';
import isValid from './isValid';
import isEnvironment from './isEnvironment';
import stringify from './stringify';
import castParam from './castParam';

export type TType = 'string' | 'arraybuffer' | 'datauri' | 'base64' | 'blob' | 'buffer' | 'byte-size' | 'size' | 'size-format';

export type TTo = ArrayBuffer | Blob | Buffer | string | number;

// Only for browser, since browser only has Blob
const dataUriToBlob = (value: string, arrayBuffer = false): Blob | ArrayBuffer | undefined => {
  if (isValid('datauri', value) || isValid('base64', value)) {
    try {
      // Convert base64 to raw binary data held in a string
      const byteString = atob(isValid('datauri', value) ? value.split(',')[1] : value);

      // Separate out the mime component
      const mimeString = isValid('datauri', value) && value.split(',')[0].split(':')[1].split(';')[0];

      // Write the bytes of the string to an ArrayBuffer
      const ab = new ArrayBuffer(byteString.length * 2);

      // create a view into the buffer
      const ia = new Uint16Array(ab);

      // Set the bytes of the buffer to the correct values
      for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

      if (arrayBuffer) return ab;

      // Write the ArrayBuffer to a blob, and you're done
      const blob = new Blob([ab], { type: mimeString });

      return blob;
    }
    catch (error) {
      return;
    }
  }
};

// Only for nodejs, since only nodejs has Buffer
const dataUriToBuffer = (value: string): Buffer | undefined => {
  if (isValid('datauri', value) || isValid('base64', value)) {
    try {
      // Extract the base64 data from dataUri
      const data = isValid('datauri', value) ? value.split(',')[1] : value;

      // Create buffer from base64 string
      return Buffer.from(data, 'base64');
    }
    catch (error) {
      return;
    }
  }
};

const sizeFormat = (value: number, decimals = 2): string => {
  if (!is('number', value) || value <= 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const unitIndex = Math.floor(Math.log(value) / Math.log(k));

  return `${parseFloat((value / Math.pow(k, unitIndex)).toFixed(dm))} ${sizes[unitIndex]}`;
};

export interface IOptions {
  decimals?: number;
  mime?: string;
}

const optionsDefault: IOptions = {
  decimals: 2,
  mime: 'text/plain',
};

const to = (
  value_: any,
  type: TType = 'arraybuffer',
  options_: IOptions = {}
): TTo => {
  const options = { ...optionsDefault, ...options_ };

  let value: any = value_;

  switch (type) {
    case 'string':
      if (is('arraybuffer', value)) return String.fromCharCode.apply(null, new Uint16Array(value));

      if (is('buffer', value)) return (value as Buffer).toString('utf-8');

      if (isValid('base64', value)) {
        if (isEnvironment('browser')) return atob(value);
        if (isEnvironment('nodejs')) return Buffer.from(value, 'base64').toString('binary');
      }

      if (isValid('datauri', value)) {
        if (isEnvironment('browser')) return atob(value.split(',')[1]);
        if (isEnvironment('nodejs')) return Buffer.from(value.split(',')[1], 'base64').toString('binary');
      }

      if (is('string', value)) return value;

      return stringify(value);

    case 'arraybuffer':
      if (isValid('base64', value)) {
        if (isEnvironment('browser')) return dataUriToBlob(value, true);
        if (isEnvironment('nodejs')) return to(Buffer.from(value, 'base64'), 'arraybuffer', options);
      }

      if (isValid('datauri', value)) {
        if (isEnvironment('browser')) return dataUriToBlob(value, true);
        if (isEnvironment('nodejs')) return to(value.split(',')[1], 'arraybuffer', options);
      }

      if (is('string', value)) {
        const arrayBuffer = new ArrayBuffer(value.length * 2);

        const arrayBufferView = new Uint16Array(arrayBuffer);

        for (let i = 0; i < value.length; i++) arrayBufferView[i] = value.charCodeAt(i);

        return arrayBuffer;
      }

      if (is('buffer', value)) {
        const arrayBuffer = new ArrayBuffer(value.length * 2);

        const arrayBufferView = new Uint16Array(arrayBuffer);

        for (let i = 0; i < value.length; i++) arrayBufferView[i] = value[i];

        return arrayBuffer;
      }

      if (is('arraybuffer', value)) return value;

      return;

    case 'base64':
      if (isValid('base64', value)) return value;

      if (is('string', value)) {
        if (isEnvironment('browser')) value = btoa(value);
        if (isEnvironment('nodejs')) value = Buffer.from(value, 'binary').toString('base64');

        return value;
      }

      return;

    case 'datauri':
      if (isValid('datauri', value)) return value;

      if (is('string', value)) {
        let base64: any;

        if (isEnvironment('browser')) base64 = btoa(value);
        if (isEnvironment('nodejs')) base64 = Buffer.from(value, 'binary').toString('base64');

        return `data:${options.mime};base64,${base64}`;
      }

      return;

    case 'blob':
      if (isEnvironment('browser')) {
        if (isValid('base64', value)) return dataUriToBlob(value);

        if (isValid('datauri', value)) return dataUriToBlob(value);

        if (is('string', value)) return new Blob([value], { type: 'text/plain' });

        if (is('blob', value)) return value;
      }

      return;

    case 'buffer':
      if (isEnvironment('nodejs')) {
        if (isValid('base64', value)) return dataUriToBuffer(value);

        if (isValid('datauri', value)) return dataUriToBuffer(value);

        if (is('string', value)) return Buffer.from(value, 'utf-8');

        if (is('buffer', value)) return value;

        return Buffer.from(stringify(value), 'utf-8');
      }

      return;

    case 'byte-size':
      if (is('string', value)) return new TextEncoder().encode(value).byteLength;

      if (is('typedarray', value) || is('buffer', value)) return (value as Uint8Array | Buffer).byteLength;

      return;

    case 'size-format':
      if (is('string', value) || is('number', value)) return sizeFormat(castParam(value), options.decimals);

      return;

    case 'size':
      if (is('string', value)) return sizeFormat(castParam(new TextEncoder().encode(value).byteLength), options.decimals);

      return;

    default:
      return;
  }
};

export default to;
