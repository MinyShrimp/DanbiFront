import { Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";

const DeleteForm = ( props ) => {
    return (
        <>
            <Row className="mb-3" style={{ textAlign: "center" }}>
                <Col>
                    <h1> 정말로 삭제하시겠습니까? </h1>
                </Col>
            </Row>
            { 
                !props.isShowAlert.isShow || 
                <Row>
                    <Col>
                        <Alert variant="warning" style={{ textAlign: "center" }}>
                            { props.isShowAlert.msg }
                        </Alert>
                    </Col>
                </Row>
            }
            <Row style={{ textAlign: "center" }}>
                <Col xs={1}></Col>
                <Col>
                    { props.delete_button }
                </Col>
                <Col>
                    { props.cancle_button }
                </Col>
                <Col xs={1}></Col>
            </Row>
        </>
    );
}

function setStore(state) {
    return { isShowAlert: state.isAlertReducer }
}

export default connect(setStore)(DeleteForm);