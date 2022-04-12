
const nullRoutines = [];

const routinesReducer = (state = nullRoutines, action) => {
    var _state  = [...state];

    switch( action.type ) {
        case 'Routines/reset':
            return nullRoutines;
            
        case 'Routines/add-item':
            _state.push( action.value );
            return _state;
        
        case 'Routines/change-result':
            _state[action.key].result = action.result;
            return _state;
        
        case 'Routines/delete-item':
            _state.splice( action.key, 1 );
            return _state;
            
        default:
            return state;
    }
}

export default routinesReducer;