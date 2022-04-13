import { useEffect, useState } from "react";
import { connect } from "react-redux";
import RoutineItem from "./RoutineItem";
import goServerWithToken from "../Server/goServerWithToken";

const UseAllDatas = ( props ) => {
    useEffect( () => {
        __get_all_data();
    }, [props.getAll.Flag]);

    const [lock, setLock] = useState(false);

    const __get_all_data = async () => {
        if( !lock ) {
            setLock(true);
            const res = await goServerWithToken( '/api/routines/all/', 'get' );
            if( res !== null ) {
                if( res.message.status === "ROUTINE_ALL_OK" ) {
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
    return { routines: state.routinesReducer, getAll: state.getAllReducer }
}

export default connect(setStore)(UseAllDatas);