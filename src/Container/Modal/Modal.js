
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";

const MyModal = ( props ) => {
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