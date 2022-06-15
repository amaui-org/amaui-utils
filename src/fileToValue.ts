
export type TType = 'text' | 'binary' | 'array-buffer' | 'datauri';

const fileToValue = (file: File, type: TType = 'text'): Promise<string | ArrayBuffer> => new Promise((resolve, reject) => {
  const reader = new FileReader();

  switch (type) {
    case 'text':
      reader.readAsText(file);
      break;

    case 'binary':
      reader.readAsBinaryString(file);
      break;

    case 'array-buffer':
      reader.readAsArrayBuffer(file);
      break;

    case 'datauri':
      reader.readAsDataURL(file);
      break;

    default:
      break;
  }

  reader.onload = () => resolve(reader.result);

  reader.onerror = reject;
});

export default fileToValue;
