import { is } from './is';
import merge from './merge';
import getStringVariables, { IGetStringVariables } from './getStringVariables';

export interface IOptions {
  getVariables?: boolean;
  cleanVariables?: boolean;
  placeholderPrefix?: string;
}

export type TVariablesToValue = Array<{ key: string; value: any; }>;

const optionsDefault: IOptions = {
  getVariables: true,
  cleanVariables: true,
  placeholderPrefix: '_',
};

const setStringVariables = (
  value: string,
  variablesToValue: TVariablesToValue = [],
  options_: IOptions = optionsDefault
): string => {
  const options = merge(options_, optionsDefault);

  if (is('string', value)) {
    let newValue = value;
    let stringVariables: IGetStringVariables = { variables: variablesToValue.map(variable => variable.key) };

    if (options.getVariables) {
      stringVariables = getStringVariables(value, {
        cleanVariables: options.cleanVariables,
        placeholderPrefix: options.placeholderPrefix,
      });

      newValue = stringVariables.valueWithPlaceholders;
    }

    stringVariables.variables.forEach((variable, index) => {
      const variableItem = variablesToValue.find(item => item.key === variable);

      if (variableItem) {
        const variableValue = variableItem.value;

        if (variableValue !== undefined) newValue = newValue.replace(new RegExp(`\\${options.placeholderPrefix}${index}`), variableValue);
      }
    });

    return newValue;
  }
};

export default setStringVariables;
