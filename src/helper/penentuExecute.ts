import fetchData from './factoryFetch/interfaceFetchData';
import fetchGet from './factoryFetch/fetchGet';
import fetchPost from './factoryFetch/fetchPost';
import fetchPut from './factoryFetch/fetchPut';
import fetchDelete from './factoryFetch/fetchDelete';

class penentuExecute {
    static tentukan(url:string, options: string ): fetchData {
        switch (options) {
            case "GET":
                return new fetchGet(url, options);
                break;

            case "POST":
                return new fetchPost(url, options);
                break;   
                
            case "PUT":
                return new fetchPut(url, options);
                break;
        
            case "DELETE":
                return new fetchDelete(url, options);
                break;

            default:
                return new fetchGet(url, 'GET');
                break;
        }
    }
}

export default penentuExecute ;