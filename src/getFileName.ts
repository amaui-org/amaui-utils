import cleanValue from './cleanValue';
import capitalize from './capitalize';

export interface IOptions {
  prefix?: string;
  sufix?: string;
  clean?: boolean;
  capitalize?: boolean;
  withExt?: boolean;
}

const optionsDefault: IOptions = {
  capitalize: true,
  clean: true,
};

const getFileName = (
  file: File,
  options_: IOptions = {}
): string => {
  const options = { ...optionsDefault, ...options_ };

  const parts = file.name.split('.');

  let name = parts[0];
  const ext = parts[1];

  if (options.clean) name = cleanValue(name);
  if (options.capitalize) name = capitalize(name);

  return `${options.prefix || ''}${name}${options.sufix || ''}${options.withExt ? `.${ext}` : ''}`;
};

export default getFileName;
