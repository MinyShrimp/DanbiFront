import { useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import goServer    from "../../Server/goServer";
import MyModal     from "./Modal";
import AccountForm from "../Form/Account";

const SignUpModal = ( props ) => {
    useEffect(() => {
        props.dispatch({ type: "Account/change-email", value: "" });
        props.dispatch({ type: "Account/change-pwd", value: "" });
    }, [props.show]);

    const submit = async () => {
        try {
            const res = await goServer( '/api/signup/', 'post', JSON.stringify( props.account ) );
            props.handleClose();
        } catch( e ) {
            props.dispatch( { type: "isAlert/turn-on", value: e.msg } )
        }
    }

    return (
        <MyModal 
            show     = { props.show } 
            onHide   = { props.handleClose } 
            title    = "Sign up"
            contents = {
                <AccountForm
                    button = { <Button onClick={submit} style={{ width: "30%" }}> 회원가입 </Button> }
                />
            }
        />
    );
}

function setStore(state) {
    return { account: state.accountReducer }
}

export default connect(setStore)(SignUpModal);