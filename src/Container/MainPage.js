import { connect } from "react-redux";
import UseAllDatas from "./UseAllDatas";
import UseDatasDate from "./UseDatasDate";

const MainPage = ( props ) => {
    return (
        <>
            {
                props.isAll.isAll ?  
                <UseAllDatas 
                    setShowDelete = { props.setShowDelete }
                    setShowUpdate = { props.setShowUpdate }
                /> :
                <UseDatasDate 
                    setShowDelete = { props.setShowDelete }
                    setShowUpdate = { props.setShowUpdate }
                />
            }
        </>
    );
}

function setStore(state) {
    return { isAll: state.isAllReducer }
}

export default connect(setStore)(MainPage);