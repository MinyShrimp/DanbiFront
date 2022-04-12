import { connect } from "react-redux";
import UseAllDatas from "../Server/UseAllDatas";
import UseDatasDate from "../Server/UseDatasDate";

const MainPage = ( props ) => {
    return (
        <>
            {
                props.mainpage ?  
                <UseDatasDate 
                    setShowDelete = { props.setShowDelete }
                    setShowUpdate = { props.setShowUpdate }
                /> :
                <UseAllDatas 
                    setShowDelete = { props.setShowDelete }
                    setShowUpdate = { props.setShowUpdate }
                />
            }
        </>
    );
}

function setStore(state) {
    return { routines: state.routinesReducer }
}

export default connect(setStore)(MainPage);