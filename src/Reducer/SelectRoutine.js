
const nullSelectRoutine = {
    id: 0, title: "", key: 0,
    category: "", days: [], result: ""
};

const selectRoutineReducer = (state = nullSelectRoutine, action) => {
    switch( action.type ) {
        case 'SelectRoutine/reset':
            return nullSelectRoutine;

        case 'SelectRoutine/change':
            return action.value;
            
        default:
            return state;
    }
}

export default selectRoutineReducer;