
const stringToColor = (value: string) => {
  let hash = 0;

  value.split('').forEach(item => hash = item.charCodeAt(0) + ((hash << 5) - hash));

  let color = '#';

  for (let i = 0; i < 3; i++) {
    const value_ = (hash >> (i * 8)) & 0xff;

    color += value_.toString(16).padStart(2, '0');
  }

  return color;
};

export default stringToColor;
