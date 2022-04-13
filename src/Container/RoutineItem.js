
import { Form, Card, Col, Row, Button, ButtonGroup } from "react-bootstrap";
import { connect } from "react-redux";
import goServerWithToken from "../Server/goServerWithToken";

const RoutineItem = ( props ) => {
    const submit = async (e) => {
        const body = {
            "routine_id": props.id,
            "result"    : e.target.value
        };
        const res = await goServerWithToken( "/api/result/", "put", JSON.stringify(body) )
        if( res !== null ) {
            if( res.message.status === "ROUTINE_RESULT_OK" ) {
                props.dispatch({ type: "Routines/change-result", key: props.index, result: e.target.value });
                
                if( props.isAll.isAll ) {
                    props.dispatch({ type: "getAll/switch" });
                } else {
                    props.dispatch({ type: "getDays/switch" });
                    props.dispatch({ type: "getDays/change-value", value: props.getDays.value });
                }
            }
        } else {
        }
    }

    const day_convertor = () => {
        const day_str = { "MON": "월", "TUE": "화", "WED": "수", "THU": "목", "FRI": "금", "SAT": "토", "SUN": "일" };
        var result = "";
        props.days.forEach((value, index) => {
            result += day_str[value] + ( index === props.days.length - 1 ? "" : ", " );
        });
        return result;
    }

    const category_convertor = () => {
        const category_str = { "MIRACLE": "기상", "HOMEWORK": "숙제" };
        return category_str[props.category];
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
                                <div> <h5>{ category_convertor() }</h5>🕐&nbsp;&nbsp;{ day_convertor() }</div>
                            </Col>
                            <Col xs={4}>
                                <Form.Select
                                    onChange={submit}
                                    value={ props.result }
                                >
                                    <option value="NOT">아직 안함</option>
                                    <option value="TRY">시도 중</option>
                                    <option value="DONE">완료</option>
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
    return { isAll: state.isAllReducer, getDays: state.getDaysReducer }
}

export default connect(setStore)(RoutineItem);