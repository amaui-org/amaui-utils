import equalDeep from './equalDeep';
import countries, { ICountry } from './countries';

const getCountry = (...args: any[]): ICountry => {
  let mostArgsCountry: ICountry;
  let mostArgs = 0;

  for (const country of countries) {
    const countryKeys = Object.keys(country).filter(key => args.some((arg: any) => equalDeep(country[key], arg)));

    if (countryKeys.length) {
      if (
        !mostArgsCountry ||
        countryKeys.length > mostArgs
      ) {
        mostArgsCountry = country;
        mostArgs = countryKeys.length;
      }
    }
  }

  return mostArgsCountry;
};

export default getCountry;
