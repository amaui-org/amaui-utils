import is from './is';
import flattenObject from './flattenObject';
import unflattenObject from './unflattenObject';

const getObjectProperties = (
  object: any,
  path: string,
  unflatten = false
): any => {
  const values = [];

  // object or array
  if (!((is('array', object) || is('object', object)) && is('string', path) && !!path.length)) return values;

  const separator = '.';

  // Flatten the object
  const flattened = flattenObject(object, true);

  const paths = Object.keys(flattened);

  let pathsToUse = paths.map(item => ({
    path: item,
    value: undefined,
    usable: item,
    used: ''
  }));

  const parts = path.split(separator).filter(Boolean);

  if (!parts.length) return values;

  parts.forEach((part, index) => {
    // **
    // find all paths to use whose
    // usable path includes the first next part
    const partNext = parts[index + 1];

    const indexLast = (parts.length - 1) === index;

    if (part === '**') {
      pathsToUse = pathsToUse.filter(item => {
        // If no part next
        // ie. a.**
        // all are usable
        if (!partNext) return item;

        let itemParts = item.usable.split(separator).filter(Boolean);

        const index_ = itemParts.findIndex(itemPart => itemPart === partNext);

        const use = index_ > -1;

        // update
        // usable path
        if (use) {
          itemParts = itemParts.slice(index_);

          item.usable = itemParts.join(separator);

          item.used += `${!item.used ? '' : '.'}${part}`;

          return item;
        }

        return false;
      });
    }
    // *
    // use all the properties
    // ignore their first usable property
    // ie. object property or index
    else if (part === '*') {
      pathsToUse = pathsToUse.filter(item => {
        const itemNew = item;

        const itemParts = itemNew.usable.split(separator).filter(Boolean);

        // only use
        // exact path items
        if (indexLast) return itemParts.length === 1;

        // remove the first prop
        // object property or index
        itemParts.shift();

        itemNew.usable = itemParts.join(separator);

        item.used += `${!item.used ? '' : '.'}${part}`;

        return true;
      });
    }
    // regular
    // whose first usable item is
    // equal to part
    else {
      pathsToUse = pathsToUse.filter(item => {
        if (!item.usable.length) return false;

        const itemParts = item.usable.split(separator).filter(Boolean);

        const use = itemParts[0] === part;

        // update
        // usable path
        if (use) {
          itemParts.shift();

          item.usable = itemParts.join(separator);

          item.used += `${!item.used ? '' : '.'}${part}`;
        }

        // if last index
        // only return items
        // whose usable path
        // matches exactly
        if (indexLast) return !item.usable.length;

        return use;
      });
    }
  });

  const value = {};

  pathsToUse.forEach(item => value[item.path] = item.value !== undefined ? item.value : flattened[item.path]);

  return !unflatten ? value : unflattenObject(value);
};

export default getObjectProperties;
