
const nullLogin = { isAll: true };

const isAllReducer = (state = nullLogin, action) => {
    var _state = JSON.parse( JSON.stringify(state) );
    switch( action.type ) {
        case 'isAll/turn-on':
            _state.isAll = true;
            return _state;
        
        case 'isAll/turn-off':
            _state.isAll = false;
            return _state;
            
        default:
            return state;
    }
}

export default isAllReducer;