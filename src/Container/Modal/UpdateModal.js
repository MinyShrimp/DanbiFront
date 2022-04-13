import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import MyModal from "./Modal";
import AddForm from "../Form/AddForm";
import goServerWithToken from "../../Server/goServerWithToken";

const UpdateModal = ( props ) => {
    const submit = async () => {
        const res = await goServerWithToken( "/api/routine/", "put", JSON.stringify(props.routine) )
        if( res !== null ) {
            if( res.message.status === "ROUTINE_UPDATE_OK" ) {
                props.handleClose();
                
                if( props.isAll.isAll ) {
                    props.dispatch({ type: "getAll/switch" });
                } else {
                    props.dispatch({ type: "getDays/switch" });
                    props.dispatch({ type: "getDays/change-value", value: props.getDays.value });
                }
            }
        } else {
            props.dispatch( { type: "isAlert/turn-on", value: "업데이트를 실패했습니다." } );
        }
    }

    return (
        <MyModal 
            show   = { props.show } 
            onHide = { props.handleClose } 
            title  = "루틴 추가"
            contents = {
                <AddForm
                    button = { <Button onClick={submit} style={{ width: "30%" }}> 확인 </Button> }
                />
            }
        />
    );
}

function setStore(state) {
    return { routine: state.routineReducer, isAll: state.isAllReducer, getDays: state.getDaysReducer }
}

export default connect(setStore)(UpdateModal);