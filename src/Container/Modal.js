
import { useEffect } from "react";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const MyModal = ( props ) => {

    useEffect(() => {
        props.dispatch({ type: "Account/change-email", value: "" });
        props.dispatch({ type: "Account/change-pwd", value: "" });
    }, [props.show]);

    return (
        <Modal 
            show     = { props.show } 
            onHide   = { props.onHide } 
            centered = { true }
        >
            <Modal.Body>
                <h2 className="mb-3"> { props.title } </h2>
                { props.contents }
            </Modal.Body>
      </Modal>
    );
};

function setStore(state) {
    return { account: state.accountReducer }
}

export default connect(setStore)(MyModal);