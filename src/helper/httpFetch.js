class httpFetch {
  constructor(url, action) {
    this._url = url;
    this._action = action;
  }

  get httpUrl() {
    return this._url;
  }

  get httpAction() {
    return this._action;
  }

  executeGet() {
    this._action = 'GET';
    return new Promise((resolve, reject) => {
      fetch(this._url, {
        method: this._action,
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((json) => {
          resolve(json);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }
}

export default httpFetch;
