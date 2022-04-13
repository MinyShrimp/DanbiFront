
import { useState } from "react";
import { Button, Col, InputGroup, Row, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import goServerWithToken from "../Server/goServerWithToken";

const DayButtons = ( props ) => {
    const [daysDict, setDaysDict] = useState({
        "ALL": { title: "All", value: "ALL", checked: true },
        "MON": { title: "월",  value: "MON", checked: false },
        "TUE": { title: "화",  value: "TUE", checked: false },
        "WED": { title: "수",  value: "WED", checked: false },
        "THU": { title: "목",  value: "THU", checked: false },
        "FRI": { title: "금",  value: "FRI", checked: false },
        "SAT": { title: "토",  value: "SAT", checked: false },
        "SUN": { title: "일",  value: "SUN", checked: false },
    });

    const [ id, setId ] = useState("");

    const submit = async (e) => {
        if( id != "" ) {
            const res = await goServerWithToken('/api/routine/?routine_id=' + id, "GET");
            console.log(res);
            if( res != null ) {
                if( res.message.status === "ROUTINE_DETAIL_OK" ) {
                    const data = res.data;
                    props.dispatch({ type: "Routines/reset" });

                    props.dispatch({ 
                        type: "Routines/add-item", 
                        value: {
                            id: data.id, title: data.title, key: 0,
                            category: data.category, days: data.days, 
                            result: data.result, is_alarm: data.is_alarm
                        }
                    });
                }
            } else {
                if( props.isAll.isAll ) {
                    props.dispatch({ type: "getAll/switch" });
                } else {
                    props.dispatch({ type: "getDays/switch" });
                    props.dispatch({ type: "getDays/change-value", value: props.getDays.value });
                }
            }
        }
        setId("");
    }

    return (
        <div className="main-header">
            <Row>
                <Col style={{ textAlign: "left" }}>
                    <InputGroup style={{ width: "50%" }}>
                        <FormControl
                            type="number"
                            aria-describedby="basic-addon2"
                            placeholder="routine_id"
                            value={id}
                            onChange={(e) => { setId( e.target.value ); }}
                        />
                        <Button
                            id="button-addon2"
                            variant="outline-secondary"
                            onClick={submit}
                        > 검색 </Button>
                    </InputGroup>
                </Col>
                <Col>
                {
                    Object.values( daysDict ).map((value, index) => {
                        return (
                            <Button 
                                key={index}
                                variant={ value.checked ? "dark" : "outline-dark"}
                                onClick={() => {
                                    if(index === 0) {
                                        props.dispatch({ type: "getAll/switch" });
                                        props.dispatch({ type: "isAll/turn-on" });
                                    } else {
                                        props.dispatch({ type: "getDays/switch" });
                                        props.dispatch({ type: "getDays/change-value", value: value.value })
                                        props.dispatch({ type: "isAll/turn-off" });
                                    }

                                    let _tmp = JSON.parse(JSON.stringify(daysDict));
                                    Object.values( _tmp ).forEach((v) => { v.checked = false; })
                                    _tmp[value.value].checked = true;
                                    setDaysDict(_tmp);
                                }}
                                value={value.value}
                                style={{ marginRight: "10px" }}
                            > {value.title} </Button>
                        );
                    })
                }
            </Col>
            </Row>
        </div>
    );
}

function setStore(state) {
    return { routines: state.routinesReducer, isAll: state.isAllReducer, getDays: state.getDays }
}

export default connect(setStore)(DayButtons);