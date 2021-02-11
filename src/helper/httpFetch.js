class httpFetch {
  constructor(url = 'http://localhost:3000/rencana', action = 'GET') {
    this._url = url;
    this._action = action;
    this._sukses = false;
  }

  get httpUrl() {
    return this._url;
  }

  get httpAction() {
    return this._action;
  }

  get success() {
    return this._sukses;
  }

  set success(sukses) {
    this._sukses = sukses;
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

  executePost(objData) {
    return new Promise((resolve, reject) => {
      const datanya = JSON.stringify(objData);
      fetch(this._url, {
        method: 'POST', // or 'PUT'
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(objData.data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.success = true;
          resolve(JSON.stringify(data));
          return data;
        })
        .catch((error) => {
          reject(error);
          this.success = false;
          return error;
        });
    });
  }

  executePut(objData) {
    return new Promise((resolve, reject) => {
      const datanya = JSON.stringify(objData);
      fetch(this._url, {
        method: 'PUT', // or 'POST'
        headers: {
          'Content-Type': 'application/json',
        },
        body: datanya,
      })
        .then((response) => response.json())
        .then((data) => {
          this.success = true;
          resolve(JSON.stringify(data));
        })
        .catch((error) => {
          this.success = false;
          reject(`Berita error ${error}`);
        });
    });
  }

  executeDelete() {
    return new Promise((resolve, reject) => {
      fetch(this._url, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then((data) => {
          this.success = true;
          resolve(JSON.stringify(data));
        })
        .catch((error) => {
          this.success = false;
          reject(`Berita error ${error}`);
        });
    });
  }
}

export default httpFetch;
