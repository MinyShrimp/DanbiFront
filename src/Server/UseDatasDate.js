import { useEffect, useState } from "react";
import { connect } from "react-redux";
import RoutineItem from "../Container/RoutineItem";
import goServerWithToken from "./goServerWithToken";

const UseDatasDate = ( props ) => {
    const [lock, setLock] = useState(false);
    
    useEffect( () => {
        __get_search_datas();
    }, [props.getDays.value]);

    const __get_search_datas = async () => {
        if( !lock ) {
            setLock(true);
            const res = await goServerWithToken( '/api/routines/?day=' + props.getDays.value, 'GET' );
            if( res !== null ) {
                if( res.message.status === "ROUTINE_LIST_OK" ) {
                    const datas = res.data;
                    props.dispatch({ type: "Routines/reset" });
                    for(var i = 0; i < datas.length; i++) {
                        props.dispatch({ 
                            type: "Routines/add-item", 
                            value: {
                                id: datas[i].id, title: datas[i].title, key: i,
                                category: datas[i].category, days: datas[i].days, 
                                result: datas[i].result, is_alarm: datas[i].is_alarm
                            }
                        });
                    }
                }
            }
            setLock(false);
        }
    }
    
    return (
        <>
        {
            props.routines.map((value, index) =>
                <RoutineItem 
                    key      = { index }
                    index    = { value.key }
                    id       = { value.id }
                    title    = { value.title }
                    category = { value.category }
                    days     = { value.days }
                    result   = { value.result }
                    is_alarm = { value.is_alarm }
                    setShowDelete = { props.setShowDelete }
                    setShowUpdate = { props.setShowUpdate }
                />
            )
        }
        </>
    );
}

function setStore(state) {
    return { routines: state.routinesReducer, getDays: state.getDaysReducer }
}

export default connect(setStore)(UseDatasDate);