
import { useState } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";

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

    return (
        <div className="main-header">
            {
                Object.values( daysDict ).map((value, index) => {
                    return (
                        <Button 
                            key={index}
                            variant={ value.checked ? "dark" : "outline-dark"}
                            onClick={() => {
                                if(index === 0) {
                                    props.dispatch({ type: "getAll/switch" });
                                    props.setMainpage(false);
                                } else {
                                    props.dispatch({ type: "getDays/switch" });
                                    props.dispatch({ type: "getDays/change-value", value: value.value })
                                    props.setMainpage(true);
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
        </div>
    );
}

function setStore(state) {
    return { routines: state.routinesReducer, getDays: state.getDays }
}

export default connect(setStore)(DayButtons);