class httpFetch {
  baseUrl : string ;
  action : string ;
  sukses : boolean;

  constructor(url = 'http://localhost:3000/rencana', action = 'GET') {
    this.baseUrl = url;
    this.action = action;
    this.sukses = false;
  }

  get httpUrl():string {
    return this.baseUrl;
  }

  get httpAction():string {
    return this.action;
  }

  get success():boolean {
    return this.sukses;
  }

  set success(sukses) {
    this.sukses = sukses;
  }

  executeGet() {
    this.action = 'GET';
    return new Promise((resolve, reject) => {
      fetch(this.baseUrl, {
        method: this.action,
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
      fetch(this.baseUrl, {
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
      fetch(this.baseUrl, {
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
      fetch(this.baseUrl, {
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
