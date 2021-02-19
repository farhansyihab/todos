import penentuExecute from './penentuExecute';

class httpFetch{
    private _tipe: string;
    private _url: string;
    private _sukes: boolean;
    private _objData:any;
    
    constructor(tipe:string, url:string){
        this._tipe = tipe;
        this._url = url;
    }

    set objData(objData:any){
      this._objData = objData;
    }

    get objData():any{
      return this._objData ;
    }

    eksekusi():any{
        const ambilData = penentuExecute.tentukan(this._url, this._tipe);
        if(this._objData){
          ambilData.setobjData(this._objData);
        }
        return new Promise((resolve, reject) => {
            ambilData.execute().then((response) => resolve(response)).catch((error) => reject(error));
        });
    }

    get success():boolean {
        return this._sukes;
    }
    
    set success(sukses:boolean) {
        this._sukes = sukses;
    }

}

export default httpFetch ;