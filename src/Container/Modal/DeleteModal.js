
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import MyModal from "./Modal";
import DeleteForm from "../Form/DeleteForm";
import goServerWithToken from "../../Server/goServerWithToken";

const DeleteModal = ( props ) => {
    const submit = async () => {
        
        const body = {
            "routine_id": props.selectRoutine.id,
            "day": props.selectRoutine.days
        }
        const res = await goServerWithToken('/api/routine', 'delete', JSON.stringify( body ));

        if( res !== null ) {
            if( res.message.status === "ROUTINE_DELETE_OK" ) {
                props.handleClose();
                props.dispatch({ type: "Routines/delete-item", key: props.selectRoutine.key })
                props.dispatch({ type: "getAll/switch" });
            }
        } else {
            props.dispatch( { type: "isAlert/turn-on", value: "삭제를 실패했습니다." } );
        }
    }

    return (
        <MyModal
            show     = { props.show } 
            onHide   = { props.handleClose } 
            title    = ""
            contents = {
                <DeleteForm
                    delete_button = { <Button onClick={submit} variant="danger" style={{ width: "100%" }}> 삭제 </Button> }
                    cancle_button = { <Button onClick={props.handleClose} style={{ width: "100%" }}> 취소 </Button> }
                />
            }
        />
    );
}

function setStore(state) {
    return { selectRoutine: state.selectRoutineReducer }
}

export default connect(setStore)(DeleteModal);