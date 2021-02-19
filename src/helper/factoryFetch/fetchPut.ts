import fetchData from './interfaceFetchData';

class fetchPut implements fetchData {

    baseUrl : string ;
    action : string ;
    sukses : boolean;
    objData: any;

    constructor(url = 'http://localhost:3000/rencana', action = 'PUT') {
        this.baseUrl = url;
        this.action = action;
        this.sukses = false;
        
    }

    execute():any {
        return new Promise((resolve, reject) => {
            const datanya = JSON.stringify(this.objData.data);
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

    get success():boolean {
        return this.sukses;
    }
    
    set success(sukses) {
        this.sukses = sukses;
    }

    setobjData(objData:any):void{
      this.objData = objData;
    }

    getObjData() {
      throw new Error(`Method not implemented ${this.objData}`);
    }
}

export default fetchPut;