
const asyncMethodRetry = (method: () => Promise<any>, retries = 4, timeout = 40): Promise<any> => (
  new Promise((resolve, reject) => {
    method()
      .then(resolve)
      .catch(error => {
        if (retries <= 1) return reject(error);

        setTimeout(() => asyncMethodRetry(method, retries - 1, timeout).then(resolve, reject), timeout);
      });
  })
);

export default asyncMethodRetry;
