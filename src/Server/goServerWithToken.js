
import goServer from './goServer';

export const __goServerWithRefreshToken = async ( retry_func, ...args ) => {
    try {
        const refresh_token = window.sessionStorage.getItem("refresh_token");
        if(refresh_token === "") { throw "Null Refresh Token"; }

        const body = JSON.stringify( { "refresh": refresh_token } );

        const rows = await goServer( "/api/refresh/", "POST", body);

        window.sessionStorage.setItem("access_token", rows.access);
        retry_func( args[0], args[1], args[2] );
    } catch(e) {
        console.log(e);
        // window.sessionStorage.setItem("access_token", "");
        // window.sessionStorage.setItem("refresh_token", "");
    }
};

const goServerWithToken = async ( api, method, body = {} ) => {
    try {
        const rows = await goServer( api, method, body, {
            "Content-Type": "application/json",
            "token": window.sessionStorage.getItem("access_token")
        });

        return rows;
    } catch(e) {
        if( e.status === "ROUTINE_JWT_FAIL" ) {
            __goServerWithRefreshToken( goServerWithToken, api, method, body );
        } else {
            console.log(e);
        }
        return null;
    }
};

export default goServerWithToken;