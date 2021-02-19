import fetchData from './interfaceFetchData';

class fetchGet implements fetchData {

    baseUrl : string ;
    action : string ;
    sukses : boolean;
    objData: any;

    constructor(url = 'http://localhost:3000/rencana', action = 'GET') {
        this.baseUrl = url;
        this.action = action;
        this.sukses = false;
    }


    execute(): any {
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

    get success():boolean {
        return this.sukses;
    }
    
    set success(sukses) {
        this.sukses = sukses;
    }

    setobjData(objData: any): void {
      throw new Error(`Method not implemented ${this.objData} ${objData}`);
    }

    getObjData() {
      throw new Error(`Method not implemented ${this.objData}`);
    }
}

export default fetchGet;