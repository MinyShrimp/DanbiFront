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
                props.dispatch({ type: "getAll/switch" });
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
    return { routine: state.routineReducer }
}

export default connect(setStore)(UpdateModal);