import fetchData from './interfaceFetchData';

class fetchPost implements fetchData {

    baseUrl : string ;
    action : string ;
    sukses : boolean;
    public objData: any;

    constructor(url = 'http://localhost:3000/rencana', action = 'POST') {
        this.baseUrl = url;
        this.action = action;
        this.sukses = false;
        
    }

    execute():any {
        return new Promise((resolve, reject) => {
          const datanya = JSON.stringify(this.objData);
          fetch(this.baseUrl, {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(this.objData.data),
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

    get success():boolean {
        return this.sukses;
    }
    
    set success(sukses) {
        this.sukses = sukses;
    }

    setobjData(objData:any):void{
      // console.log(`Mo cari tau di crudFetch ts baris 108 : ${JSON.stringify(objData)}`);
      this.objData = objData;
    }

    getObjData() {
      throw new Error(`Method not implemented ${this.objData}`);
    }
}

export default fetchPost;