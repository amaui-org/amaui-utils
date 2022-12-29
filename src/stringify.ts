
// Fix for undefined
// + ref circular values
const method = () => {
  const values = new WeakSet();

  return (property: string, value: any) => {
    // Ref circular values
    const getValue = (property_: string, value_: any): any => {
      if (typeof value_ === 'object' && value_ !== null) {
        if (values.has(value_)) return;

        values.add(value_);
      }

      return value_;
    };

    if (
      getValue(property, value) === undefined ||
      value === undefined
    ) return undefined;

    return value;
  };
};

const stringify = (value_: any, spaces = 2, replacer = method()) => {
  try {
    let value = JSON.stringify(value_, replacer, spaces);

    // Array circular ref value update
    // value = value
    //   // first item
    //   .replace(/(?!\[)\n* *null,/g, '')
    //   // index 1+
    //   .replace(/,\n* *null/g, '');

    return value;
  }
  catch (error) { }

  return String(value_);
};

export default stringify;
