import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import goServer    from "../Server/goServer";
import MyModal     from "./Modal";
import AccountForm from "./Account";

const SignUpModal = ( props ) => {
    const submit = async () => {
        try {
            const res = await goServer( '/api/signup/', 'post', JSON.stringify( props.account ) );
            console.log(res);

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