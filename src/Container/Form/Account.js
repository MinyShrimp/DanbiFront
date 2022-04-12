import { Form, Row, Col, Alert } from "react-bootstrap";
import { connect } from "react-redux";

const AccountForm = ( props ) => {
    return (
        <>
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
            
            <Row>
                <Col>
                    <Form.Label htmlFor="login_email">Email</Form.Label>
                    <Form.Control
                        type="email"
                        id="login_email"
                        className="mb-3"
                        value = { props.account.email }
                        onChange = { (e) => { props.dispatch({ type: "Account/change-email", value: e.target.value }); } }
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <Form.Label htmlFor="login_pwd">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="login_pwd"
                        className="mb-3"
                        value = { props.account.pwd }
                        onChange = { (e) => { props.dispatch({ type: "Account/change-pwd", value: e.target.value }); } }
                    />
                </Col>
            </Row>
            <Row style={{ textAlign: "center" }}>
                <Col>
                    { props.button }
                </Col>
            </Row>
        </>
    );
}

function setStore(state) {
    return { account: state.accountReducer, isShowAlert: state.isAlertReducer }
}

export default connect(setStore)(AccountForm);