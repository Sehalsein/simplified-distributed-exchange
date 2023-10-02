const promisify = (callbackFn) => {
  return (...args) => {
    return new Promise((resolve, reject) => {
      callbackFn(...args, (error, data) => {
        if (error) {
          reject(error);
        } else {
          resolve(data);
        }
      });
    });
  };
};

module.exports = {
  promisify,
};
