import colorToRgb from './colorToRgb';

const alpha = (value: string, opacity: number): string => colorToRgb(value, opacity) as string;

export default alpha;
