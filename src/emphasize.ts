import getLuminance from './getLuminance';
import lighten from './lighten';
import darken from './darken';

const emphasize = (value: string, coefficient = 0.14): string | undefined => {
  const luminance = getLuminance(value);

  if (luminance !== undefined) {
    return getLuminance(value) > 0.5 ? darken(value, coefficient) : lighten(value, coefficient);
  }
};

export default emphasize;
