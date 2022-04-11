import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import goServer    from "../Server/goServer";
import MyModal     from "./Modal";
import AccountForm from "./Account";

const LoginModal = ( props ) => {
    const submit = async () => {
        try {
            const res = await goServer( '/api/login/', 'post', JSON.stringify( props.account ) );

            window.sessionStorage.setItem('access_token',  res.data.access_token);
            window.sessionStorage.setItem('refresh_token', res.data.refresh_token);

            // const msg = res.message.msg;

            props.dispatch( { type: "isLogin/turn-on" } )
            props.handleClose();
        } catch( e ) {
            props.dispatch( { type: "isAlert/turn-on", value: e.msg } )
        }
    };

    return (
        <MyModal 
            show   = { props.show } 
            onHide = { props.handleClose } 
            title  = "Login"
            contents = {
                <AccountForm
                    button = { <Button onClick={submit} style={{ width: "30%" }}> 로그인 </Button> }
                />
            }
        />
    );
}

function setStore(state) {
    return { account: state.accountReducer, isLogin: state.isLoginReducer }
}

export default connect(setStore)(LoginModal);