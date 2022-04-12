
import { Form, Card, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";

const RoutineItem = ( props ) => {
    const submit = (e) => {
        props.dispatch({ type: "Routines/change-result", key: props.index, result: e.target.value });
    }

    return (
        <Row className="mb-3">
            <Card style={{ padding: 0 }}>
                <Card.Header> 
                    <Row>
                        <Col><h2>{ props.title }</h2></Col>
                        <Col style={{ width: "44px" }} sm={1}>{ props.id }</Col>
                    </Row>  
                </Card.Header>
                <Card.Body>
                        <Row className="mb-2">
                            <Col>
                                <div> <h5>{ props.category }</h5>🕐&nbsp;&nbsp;{ props.days }</div>
                            </Col>
                            <Col xs={4}>
                                <Form.Select
                                    onChange={submit}
                                    value={ props.result }
                                >
                                    <option value="NOT">아직 안함</option>
                                    <option value="TRY">시도 중</option>
                                    <option value="DOEN">완료</option>
                                </Form.Select>
                            </Col>
                        </Row>
                        <Row>
                            <ButtonGroup aria-label="Basic example">
                                <Button 
                                    variant="success"
                                    onClick = {() => {
                                        props.setShowUpdate(true);
                                        props.dispatch({ 
                                            type: "Routine/change-all", 
                                            value: { 
                                                routine_id: props.id, title: props.title, 
                                                category: props.category, goal: "", 
                                                days: props.days, is_alarm: props.is_alarm 
                                            }
                                        });
                                        props.dispatch({ type: "Checks/reset", value: props.days });
                                        props.dispatch({ type: "Checks/set-init", value: props.days });
                                    }}
                                >수정</Button>

                                <Button 
                                    variant="danger"
                                    onClick = {() => {
                                        props.setShowDelete(true);
                                        props.dispatch({ 
                                            type: "SelectRoutine/change", 
                                            value: {
                                                id: props.id, title: props.title, key: props.index,
                                                category: props.category, days: props.days, result: props.result
                                            } 
                                        });
                                    }}
                                >삭제</Button>
                            </ButtonGroup>
                        </Row>
                </Card.Body>
            </Card>
        </Row>
    );
}

function setStore(state) {
    return {}
}

export default connect(setStore)(RoutineItem);