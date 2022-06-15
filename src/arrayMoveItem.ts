import { is } from './is';

const arrayMoveItem = (value: any[], previousIndex: number, newIndex: number): any[] => {
  if (is('array', value)) {
    if (newIndex >= value.length) {
      let toAdd = newIndex - value.length + 1;

      while (toAdd--) value.push(undefined);
    }

    value.splice(newIndex, 0, value.splice(previousIndex, 1)[0]);
  }

  return value;
};

export default arrayMoveItem;
