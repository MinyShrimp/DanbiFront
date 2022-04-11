
import Config from './Config';

const goServer = async ( api, method, body = {}, headers = Config.headers ) => {
    try{
        const res = await fetch( Config.serverIP + api, {
            method: method,
            headers: headers,
            body: body
        });
        
        return new Promise(async (resolve, reject) => {
            if(res.ok) {
                const rows = await res.json();
                resolve(rows);
            } else {
                const rows = await res.json();
                reject(rows);
            }
        });
    } catch(e) {
        console.log(e);
    }
};

export default goServer;