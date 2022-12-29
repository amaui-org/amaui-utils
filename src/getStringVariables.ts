import is from './is';

export interface IGetStringVariables {
  value?: string;
  variables?: string[];
  valueWithPlaceholders?: string;
}

export interface IOptions {
  variablesRegExp?: RegExp;
  cleanVariables?: boolean;
  placeholderPrefix?: string;
}

const optionsDefault: IOptions = {
  variablesRegExp: /(\{.*?\}|\[.*?\])/g,
  cleanVariables: true,
  placeholderPrefix: '_',
};

const getStringVariables = (
  value: string,
  options_: IOptions = {}
): IGetStringVariables => {
  const options = { ...optionsDefault, ...options_ };

  let valueWithPlaceholders = value;

  if (is('string', value)) {
    let variables: RegExpMatchArray | [] = value.match(options.variablesRegExp) || [];

    variables.forEach((variable, index) => valueWithPlaceholders = valueWithPlaceholders.replace(variable, `${options.placeholderPrefix}${index}`));

    if (options.cleanVariables) variables = variables.map(variable => variable.slice(1, variable.length - 1)) as [];

    return {
      value,
      variables,
      valueWithPlaceholders,
    };
  }
};

export default getStringVariables;
