import { useState } from "react";
import { Row, Col, Alert, Form } from "react-bootstrap";
import { connect } from "react-redux";

const AddForm = (props) => {
    return (
        <>
            { 
                !props.isShowAlert.isShow || 
                <Row className="mb-3">
                    <Col>
                        <Alert variant="warning" style={{ textAlign: "center" }}>
                            { props.isShowAlert.msg }
                        </Alert>
                    </Col>
                </Row>
            }
            
            <Row className="mb-3">
                <Col>
                    <Form.Label htmlFor="title">제목</Form.Label>
                    <Form.Control
                        type="text"
                        id="title"
                        value={ props.routine.title }
                        onChange={(e) => { 
                            props.dispatch({ type: "Routine/change-title", value: e.target.value })
                        }}
                    />
                </Col>
                <Col>
                    <Form.Label htmlFor="category">카테고리</Form.Label>
                    <Form.Select
                        onChange={(e) => {
                            props.dispatch({ type: "Routine/change-category", value: e.target.value });
                        }}
                        value={ props.routine.category }
                    >
                        <option value="MIRACLE">기상</option>
                        <option value="HOMEWORK">숙제</option>
                    </Form.Select>
                </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                    <Form>
                        <Form.Label>요일</Form.Label>
                        <div key="inline-checkbox" className="mb-3">
                            {
                                Object.values(props.checks).map((value, index) => {
                                    return (
                                        <Form.Check
                                            key={index}
                                            inline
                                            label={value.title}
                                            type="checkbox"
                                            id={`date-${index}`}
                                            value={value.value}
                                            checked={value.checked}
                                            onClick={(e) => {
                                                if(e.target.checked) {
                                                    props.dispatch({ type: "Routine/add-day", value: value.value })
                                                    props.dispatch({ type: "Checks/check", value: value.value })
                                                } else {
                                                    props.dispatch({ type: "Routine/remove-day", value: value.value })
                                                    props.dispatch({ type: "Checks/uncheck", value: value.value })
                                                }
                                            }}
                                            onChange={(e) => {}}
                                        />
                                    );
                                })
                            }
                        </div>
                    </Form>
                </Col>
                <Col xs={2}>
                    <Form>
                        <Form.Label htmlFor="is_alarm">알람</Form.Label>
                        <Form.Check 
                            type="switch"
                            id="is_alarm"
                            onChange={(e) => { 
                                props.dispatch({ type: "Routine/change-isAlarm", value: e.target.checked })
                            }}
                            checked={props.routine.is_alarm}
                        />
                    </Form>
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
    return { isShowAlert: state.isAlertReducer, routine: state.routineReducer, checks: state.checksReducer }
}

export default connect(setStore)(AddForm);