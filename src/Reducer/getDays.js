
const nullGetDays = { Flag: false, value: "ALL" };

const getDaysReducer = (state = nullGetDays, action) => {
    var _state = JSON.parse( JSON.stringify(state) );
    switch( action.type ) {
        case 'getDays/switch':
            _state.Flag = !_state.Flag;
            return _state;
        
        case 'getDays/change-value':
            _state.value = action.value;
            return _state;
            
        default:
            return state;
    }
}

export default getDaysReducer;