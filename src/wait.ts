
const wait = (milliseconds: number = 400): Promise<undefined> => new Promise(resolve => setTimeout(resolve, milliseconds));

export default wait;
