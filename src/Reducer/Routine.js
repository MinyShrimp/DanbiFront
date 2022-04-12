
const nullRoutine = { title: "", category: "MIRACLE", goal: "", days: [], is_alarm: false };

const routineReducer = (state = nullRoutine, action) => {
    var _state = JSON.parse( JSON.stringify(state) );

    switch( action.type ) {
        case 'Routine/reset':
            return nullRoutine;

        case 'Routine/change-title':
            _state.title = action.value;
            return _state;
        
        case 'Routine/change-category':
            _state.category = action.value;
            return _state;
        
        case 'Routine/add-day':
            var _days   = new Set( _state.days );
            _state.days = Array.from( _days.add( action.value ) );
            return _state;
        
        case 'Routine/remove-day':
            const idx = _state.days.indexOf(action.value);
            if( idx > -1 ) { _state.days.splice( idx, 1 ); }
            return _state;
        
        case 'Routine/change-isAlarm':
            _state.is_alarm = action.value;
            return _state;
        
        case 'Routine/change-all':
            return action.value;
            
        default:
            return state;
    }
}

export default routineReducer;