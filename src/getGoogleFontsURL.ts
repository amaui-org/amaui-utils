import is from './is';

interface IGoogleFont {
  name: string;
  weights: Array<string | number>;
}

/**
 * Example:
 * Input:
 * getGoogleFontsURL([
 *   { name: 'Roboto', weights: [400, 700] },
 *   { name: 'Source Sans 3', weights: ['italic 200', 400, 700] },
 * ]);
 * Output:
 * 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&family=Source+Sans+3:ital,wght@0,200;0,700;1,200&display=swap'
 */
const getGoogleFontsURL = (value: Array<IGoogleFont>) => {
  if (is('array', value)) {
    let googleFontsLink = 'https://fonts.googleapis.com/css2?';

    for (const font of value) {
      if (!font.weights) font.weights = [];

      const hasItalic = font.weights.some((weight: string | number) => is('string', weight) && (weight as string).indexOf('italic ') === 0);

      if (!font.weights.length) font.weights.push(400);

      font.weights = font.weights.map((weight: string | number) => {
        if (is('string', weight) && (weight as string).indexOf('italic') === 0) return (weight as string).replace('italic ', '1,').replace(/\s/g, '');

        return `${hasItalic ? '0,' : ''}${String(weight)}`;
      });

      font.weights.sort();

      googleFontsLink += `family=${font.name.replace(/\s/g, '+')}:${hasItalic ? 'ital,' : ''}wght@${font.weights.join(';')}&`;
    }

    googleFontsLink += `display=swap`;

    return googleFontsLink;
  }
};

export default getGoogleFontsURL;
