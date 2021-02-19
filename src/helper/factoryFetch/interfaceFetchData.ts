interface fetchData {
    baseUrl : string ;
    action : string ;
    sukses : boolean;
    objData:any;
    execute():any;
    setobjData(objData:any):void;
    getObjData():any;
}

export default fetchData;